import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDetailsDialogComponent } from './pay-details-dialog.component';

describe('PayDetailsDialogComponent', () => {
  let component: PayDetailsDialogComponent;
  let fixture: ComponentFixture<PayDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
