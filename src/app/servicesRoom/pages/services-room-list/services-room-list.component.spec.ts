import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesRoomListComponent } from './services-room-list.component';

describe('ServicesRoomListComponent', () => {
  let component: ServicesRoomListComponent;
  let fixture: ComponentFixture<ServicesRoomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesRoomListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
