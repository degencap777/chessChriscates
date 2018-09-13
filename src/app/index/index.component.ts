import { Component, OnInit } from '@angular/core';
import { ChessService } from '../chess.service';

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

  constructor(public chess: ChessService) {

  }

  ngOnInit() {
    this.render();
    this.getInfo();
  }

  getInfo() {
    console.log(this.chess.game);
    console.log(this.chess.game.moves({ square: 'e2', verbose: true }));

    this.turn = this.chess.game.turn();
    this.check = this.chess.game.in_check() === true ? 'yes' : 'no';
    this.checkmate = this.chess.game.in_checkmate() === true ? 'yes' : 'no';
    this.draw = this.chess.game.in_draw() === true ? 'yes' : 'no';
    this.stalemate = this.chess.game.in_stalemate() === true ? 'yes' : 'no';
  }

  render() {
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
