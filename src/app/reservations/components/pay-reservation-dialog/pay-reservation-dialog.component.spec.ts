import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayReservationDialogComponent } from './pay-reservation-dialog.component';

describe('PayReservationDialogComponent', () => {
  let component: PayReservationDialogComponent;
  let fixture: ComponentFixture<PayReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayReservationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
