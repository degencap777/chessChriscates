import { TestBed, inject } from '@angular/core/testing';

import { ChessService } from './chess.service';

describe('ChessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChessService]
    });
  });

  it('should be created', inject([ChessService], (service: ChessService) => {
    expect(service).toBeTruthy();
  }));
});
