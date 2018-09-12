import { Injectable } from '@angular/core';
import * as Chess from 'oop-chess';

@Injectable({
  providedIn: 'root'
})
export class ChessService {
  
  public game = Chess;
  public move = null;
  public status = null;

  constructor() {
    this.game.init('P1', 'P2');
  }

}
