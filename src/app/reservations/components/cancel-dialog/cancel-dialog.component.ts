import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { ReservationsApiService } from '../../../services/reservations-api.service';

@Component({
  selector: 'app-cancel-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './cancel-dialog.component.html',
  styleUrl: './cancel-dialog.component.css'
})
export class CancelDialogComponent {

  cancelReservationSub!: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reservationId: number},
    private dialogRef: MatDialogRef<CancelDialogComponent>, private reservationService: ReservationsApiService) {

  }
  
  onCancelReservation(): void {
    this.cancelReservationSub = this.reservationService.cancelReservation(this.data.reservationId).subscribe(result => {
      this.dialogRef.close({canceled: true});
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if(this.cancelReservationSub)
      this.cancelReservationSub.unsubscribe()
  }
}
