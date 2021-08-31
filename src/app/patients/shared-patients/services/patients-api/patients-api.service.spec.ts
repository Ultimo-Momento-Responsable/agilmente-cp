import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PatientsApiService } from './patients-api.service';

describe('PatientsApiService', () => {
  let service: PatientsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(PatientsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
