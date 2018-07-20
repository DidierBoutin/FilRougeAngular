import { TestBed, inject } from '@angular/core/testing';

import { RepasCRUDService } from './repas-crud.service';

describe('RepasCRUDService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepasCRUDService]
    });
  });

  it('should be created', inject([RepasCRUDService], (service: RepasCRUDService) => {
    expect(service).toBeTruthy();
  }));
});
