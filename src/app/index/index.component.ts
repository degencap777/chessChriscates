import { Component, OnInit } from '@angular/core';
import { ChessService } from '../chess.service';

import * as moment from 'moment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public display = [];
  public availableMoves = [];

  public totalMoves = 0;
  public turn = 'w';

  public whiteTaken = [];
  public blackTaken = [];

  public aiTime = 0;
  public humanTime = 0;

  public check = 'no';
  public checkmate = 'no';
  public draw = 'no';
  public stalemate = 'no';

  public moveHistory = [];

  public activeSquare = null;
  public actualMoves = [];
  public activeMoves = [];

  constructor(public chess: ChessService) {

  }

  ngOnInit() {
    this.getInfo();
    this.render();
  }

  getInfo() {
    console.log(this.chess.game);
    const history = this.chess.game.history({ verbose: true });
    
    if (history.length > 0) {
      const historyItem = history.reverse()[0];
      historyItem['time'] = moment().format('h:mm a');
      this.moveHistory.unshift(historyItem);
    }

    this.turn = this.chess.game.turn();
    this.check = this.chess.game.in_check() === true ? 'yes' : 'no';
    this.checkmate = this.chess.game.in_checkmate() === true ? 'yes' : 'no';
    this.draw = this.chess.game.in_draw() === true ? 'yes' : 'no';
    this.stalemate = this.chess.game.in_stalemate() === true ? 'yes' : 'no';
  }

  action(item) {
    const square = item.square;
    let moves =  this.chess.game.moves({ square });
    if (this.activeMoves.indexOf(square) !== -1) {
      const actualMoveIndex = this.activeMoves.indexOf(square);
      this.chess.game.move(this.actualMoves[actualMoveIndex]);
      this.activeSquare = null;
      this.actualMoves = [];
      this.activeMoves = [];
      this.getInfo();
      this.render();
    } else if (this.activeSquare !== square) {
      this.activeSquare = square;
      
      console.log(moves);

      this.actualMoves = moves;

      moves = moves.map(move => {
        if (move.length > 2) {
          move = move.replace(/\+/g, '');
          return move.substr(move.length - 2, move.length);
        } else {
          return move;
        }
      });
  
      this.activeMoves = moves;
    } else {
      this.activeSquare = null;
      this.actualMoves = [];
      this.activeMoves = [];
    }
  }

  invertedColor(color) {
    if (color === 'w') {
      return 'b';
    } else {
      return 'w';
    }
  }

  render() {
    this.display = [];
    const squares = this.chess.game.SQUARES;
    const rows = [];

    for (let i = 0; i < squares.length; i = i + 8) {
      rows.push(squares.slice(i, i + 8));
    }
    
    rows.forEach(row => {
      const notation = [];

      row.forEach(square => {
        let status = this.chess.game.get(square);
        
        if (!status) {
          status = { type: null, color: null };
        }

        notation.push({ square, status });
      });

      this.display.push(notation);
    });
  }

}
