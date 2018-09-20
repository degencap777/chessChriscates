import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicService {

  public winningCoords = [
    [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 } ],
    [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 } ],
    [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 } ],
    [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 } ],
    [ { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 } ],
    [ { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 } ],
    [ { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 } ],
    [ { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 } ],
  ];

  public RewardVectors = [];
  public Reward = 0;

  constructor() {

  }

  generateVectors(pIndex, board) {
    const squares = [];
    const player = [];
    const enemy = [];

    for (let i = 0; i < board[0].length; i++) {
      for (let ii = 0; ii < board[0].length; ii++) {
        squares.push(board[i][ii]);

        if (board[i][ii]['value'] === pIndex) {
          player.push(board[i][ii]);
        } else if (board[i][ii]['value'] !== -1) {
          enemy.push(board[i][ii]);
        }
      }
    }

    const winningMoves = this.movesForWin(player, enemy, this.winningCoords);

    const vectors = squares.map(square => {
      const vector = square;
      vector['reward'] = 0;
      return vector;
    });

    vectors.forEach((vector, i) => {
      winningMoves.forEach(combo => {
        let reward = 0;
        let match = false;

        for (let ii = 0; ii < combo.length; ii++) {
          if (vector['x'] === combo[ii]['x'] && vector['y'] === combo[ii]['y']) {
            match = true;
          }
        }

        if (match === true) {
          if (combo.length === 1) {
            reward = 100;
          } else if (combo.length === 2) {
            reward = 20;
          } else if (combo.length === 3) {
            reward = 10;
          }

          if (reward === 100) {
            vectors[i]['reward'] = reward;
          } else {
            vectors[i]['reward'] += reward;
          }
        }
      });
    });

    return vectors;
  }

  movesForWin(player, enemy, winningCoords) {
    return winningCoords.map(coords => {
      const validWin = [];
      let match = true;

      for (let i = 0; i < coords.length; i++) {
        let ownedbyPlayer = false;

        for (let ii = 0; ii < player.length; ii++) {
          if (player[ii]['x'] === coords[i]['x'] && player[ii]['y'] === coords[i]['y']) {
            ownedbyPlayer = true;
          }
        }

        for (let ii = 0; ii < enemy.length; ii++) {
          if (enemy[ii]['x'] === coords[i]['x'] && enemy[ii]['y'] === coords[i]['y']) {
            match = false;
          }
        }

        if (ownedbyPlayer === false) {
          validWin.push(coords[i]);
        }
      }

      if (match === true) {
        return validWin;
      } else {
        return [];
      }
    });
  }

}
