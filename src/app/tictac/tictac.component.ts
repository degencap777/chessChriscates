import { Component, OnInit } from '@angular/core';
import { TicService } from '../tic.service';

@Component({
  selector: 'app-tictac',
  templateUrl: './tictac.component.html',
  styleUrls: ['./tictac.component.scss']
})
export class TictacComponent implements OnInit {

  public boardSize = 3;
  public board = [];

  public turn = 0;
  public winner = -1;

  public lastMove = null;

  public showVectors = true;
  public vectors = [];

  constructor(public tic: TicService) {

  }

  ngOnInit() {
    this.createBoard();
  }

  toggleVectors() {
    this.showVectors = !this.showVectors;
  }

  moveWithAI() {
    if (this.vectors.length === 0) {
      const optimalVector = this.board[1][1];
      this.selectSquare(optimalVector);
    } else {
      let highestReward = 0;
      let bestVectors = [];
      
      for (let i = 0; i < this.vectors.length; i++) {
        if (this.vectors[i]['reward'] <= highestReward) {
          bestVectors.push(this.vectors[i]);
        } else {
          bestVectors = [ this.vectors[i] ];
          highestReward = this.vectors[i]['reward'];
        }
      }

      const rngVec = bestVectors[Math.floor(Math.random() * bestVectors.length - 1)];
      const optimalVector = this.board[rngVec['y']][rngVec['x']];
      this.selectSquare(optimalVector);
    }
  }

  undo() {
    if (this.lastMove) {
      const x = this.lastMove['x'];
      const y = this.lastMove['y'];
      this.board[y][x] = { x, y, value: -1 };
      this.lastMove = null;
      this.turn = this.turn === 0 ? 1 : 0;
    }
  }

  createBoard() {
    this.vectors = [];
    this.board = [];
    this.winner = -1;
    this.turn = 0;

    for (let i = 0; i < this.boardSize; i++) {
      const row = [];

      for (let ii = 0; ii < this.boardSize; ii++) {
        row.push({
          x: ii,
          y: i,
          value: -1
        });
      }

      this.board.push(row);
    }
  }

  selectSquare(square) {
    if (square.value === -1 && this.winner === -1) {
      square['value'] = this.turn;

      this.lastMove = square;

      this.turn = this.turn === 0 ? 1 : 0;
      this.checkWinner();

      this.vectors = this.tic.generateVectors(this.turn, this.board);
    
      this.vectors.forEach(vector => {
        console.log(`${vector['x']},${vector['y']} Reward: ${vector['reward']}`);
      });
    }
  }

  getVector(square) {
    let reward = 0;
    
    for (let i = 0; i < this.vectors.length; i++) {
      if (this.vectors[i]['x'] === square['x'] && this.vectors[i]['y'] === square['y']) {
        reward = this.vectors[i]['reward'];
      }
    }

    return reward;
  }

  checkWinner() {
    const values = [];
    let winner = -1;

    for (let i = 0; i < this.boardSize; i++) {
      for (let ii = 0; ii < this.boardSize; ii++) {
        values.push(this.board[i][ii]);
      }
    }

    const winningCoords = this.tic.winningCoords;

    winningCoords.forEach(coords => {
      let p0 = 0;
      let p1 = 0;

      values.forEach(square => {
        coords.forEach(coord => {
          if (square['x'] === coord['x'] && square['y'] === coord['y']) {
            if (square.value === 0) {
              p0++;
            } else if (square.value === 1) {
              p1++;
            }
          }
        });
      });

      if (p0 === 3) {
        winner = 0;
      } else if (p1 === 3) {
        winner = 1;
      }
    });

    this.winner = winner;
  }

}
