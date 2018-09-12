import { Component, OnInit } from '@angular/core';
import { ChessService } from '../chess.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public display = [];

  public totalMoves = 0;
  public turn = 'white';

  public whiteTaken = [];
  public blackTaken = [];

  public aiTime = 0;
  public humanTime = 0;

  constructor(public chess: ChessService) {

  }

  ngOnInit() {
    this.render();
    this.getInfo();
    console.log(this.chess.game);
  }

  getInfo() {
    this.totalMoves = this.chess.game.NrOfmoves;
    this.turn = this.chess.game.turn.substr(0,1);
    this.whiteTaken = this.chess.game['p1']['takesPieces'];
    this.blackTaken = this.chess.game['p2']['takesPieces'];
  }

  render() {
    Object.keys(this.chess.game.gameBoard).forEach(key => {
      const row = this.chess.game.gameBoard[key];
      const displayArray = [];
      row.forEach((item, i) => {
        if (i > 0) {
          displayArray.push(item);
        }
      });
      this.display.unshift(displayArray);
    });

    console.log(this.display);
  }

}
