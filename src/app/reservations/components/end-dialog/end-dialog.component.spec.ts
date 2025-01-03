import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndDialogComponent } from './end-dialog.component';

describe('EndDialogComponent', () => {
  let component: EndDialogComponent;
  let fixture: ComponentFixture<EndDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
