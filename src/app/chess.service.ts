import { Injectable } from '@angular/core';

import { default as Chess } from 'chess.js';

@Injectable({
  providedIn: 'root'
})
export class ChessService {

  public game = Chess();

  public charEnum = {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
    'e': 5,
    'f': 6,
    'g': 7,
    'h': 8
  };

  public rangeEnum = [
    1,
    2,
    3,
    4,
    4,
    3,
    2,
    1
  ];

  public algorithmDepth = 1;

  public values = {
    pieces: {
      'pawn': 1,
      'knight': 3,
      'bishop': 3,
      'rook': 5,
      'queen': 9,
      'king': 100
    },
    board: [],
    white: [],
    black: []
  };

  constructor() {
    this.evaluateBoard();
    console.log(this.getBoardValues());
  }

  getCharValue(value) {
    return this.charEnum[value];
  }

  getRangeValue(value) {
    return this.rangeEnum[value - 1];
  }

  getBoardValues() {
    return this.values.board;
  }

  getWhiteValues() {
    return this.values.white;
  }

  getBlackValues() {
    return this.values.black;
  }

  evaluateBoard() {
    this.values['board'] = [];
    const range = 8;

    this.game.SQUARES.forEach(square => {
      const char = this.getCharValue(square[0]);
      const num = parseInt(square[1], 10);
      const value = this.getRangeValue(char) + this.getRangeValue(num);
      this.values['board'].push({ square, value });
    });
  }

}
