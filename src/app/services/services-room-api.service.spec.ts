import { TestBed } from '@angular/core/testing';

import { ServicesRoomApiService } from './services-room-api.service';

describe('ServicesRoomApiService', () => {
  let service: ServicesRoomApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesRoomApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
