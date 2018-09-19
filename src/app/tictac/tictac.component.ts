import { Component, OnInit } from '@angular/core';

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

  constructor() {

  }

  ngOnInit() {
    this.createBoard();
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
    this.board = [];

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
    }
  }

  checkWinner() {
    const values = [];
    let winner = -1;

    for (let i = 0; i < this.boardSize; i++) {
      for (let ii = 0; ii < this.boardSize; ii++) {
        values.push(this.board[i][ii]);
      }
    }

    const winningCoords = [
      [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 } ],
      [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 } ],
      [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 } ],
      [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 } ],
      [ { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 } ],
      [ { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 } ],
      [ { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 } ],
      [ { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 } ],
    ];

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
