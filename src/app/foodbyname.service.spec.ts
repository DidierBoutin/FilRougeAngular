import { TestBed, inject } from '@angular/core/testing';

import { FoodbynameService } from './foodbyname.service';

describe('FoodbynameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodbynameService]
    });
  });

  it('should be created', inject([FoodbynameService], (service: FoodbynameService) => {
    expect(service).toBeTruthy();
  }));
});
