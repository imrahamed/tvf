import { TestBed, inject } from '@angular/core/testing';

import { ErrorsHandler } from './errors-handler.service';

describe('ErrorsHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorsHandler]
    });
  });

  it('should be created', inject([ErrorsHandler], (service: ErrorsHandler) => {
    expect(service).toBeTruthy();
  }));
});
