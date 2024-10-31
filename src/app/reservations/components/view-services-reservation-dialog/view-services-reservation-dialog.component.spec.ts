import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServicesReservationDialogComponent } from './view-services-reservation-dialog.component';

describe('ViewServicesReservationDialogComponent', () => {
  let component: ViewServicesReservationDialogComponent;
  let fixture: ComponentFixture<ViewServicesReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewServicesReservationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewServicesReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
