import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { ReservationsApiService } from '../../../services/reservations-api.service';

@Component({
  selector: 'app-end-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './end-dialog.component.html',
  styleUrl: './end-dialog.component.css'
})
export class EndDialogComponent {
  endReservationSub!: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reservationId: number},
    private dialogRef: MatDialogRef<EndDialogComponent>, private reservationService: ReservationsApiService) {

  }
  
  onEndReservation(): void {
    this.endReservationSub = this.reservationService.endReservation(this.data.reservationId).subscribe(result => {
      this.dialogRef.close({finalized: true});
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if(this.endReservationSub)
      this.endReservationSub.unsubscribe()
  }
}
