import { TestBed, inject } from '@angular/core/testing';

import { TicService } from './tic.service';

describe('TicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicService]
    });
  });

  it('should be created', inject([TicService], (service: TicService) => {
    expect(service).toBeTruthy();
  }));
});
