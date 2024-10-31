import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServicesReservationDialogComponent } from './edit-services-reservation-dialog.component';

describe('EditServicesReservationDialogComponent', () => {
  let component: EditServicesReservationDialogComponent;
  let fixture: ComponentFixture<EditServicesReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditServicesReservationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditServicesReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
