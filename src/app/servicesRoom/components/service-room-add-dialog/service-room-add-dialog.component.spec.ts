import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRoomAddDialogComponent } from './service-room-add-dialog.component';

describe('ServiceRoomAddDialogComponent', () => {
  let component: ServiceRoomAddDialogComponent;
  let fixture: ComponentFixture<ServiceRoomAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRoomAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRoomAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
