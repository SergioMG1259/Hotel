import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRoomDialogComponent } from './service-room-dialog.component';

describe('ServiceRoomDialogComponent', () => {
  let component: ServiceRoomDialogComponent;
  let fixture: ComponentFixture<ServiceRoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRoomDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
