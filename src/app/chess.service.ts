import { Injectable } from '@angular/core';

import { default as Chess } from 'chess.js';

@Injectable({
  providedIn: 'root'
})
export class ChessService {

  public game = Chess();

  constructor() {

  }

}
