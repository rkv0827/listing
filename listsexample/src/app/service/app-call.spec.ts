import { TestBed } from '@angular/core/testing';

import { AppCall } from './app-call';

describe('AppCall', () => {
  let service: AppCall;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppCall);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
