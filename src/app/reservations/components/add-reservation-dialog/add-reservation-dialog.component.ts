import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReservationsApiService } from '../../../services/reservations-api.service';
import { Subscription } from 'rxjs';
import { AddReservation } from '../../models/addReservation';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-add-reservation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, FormsModule, MatDatepickerModule],
  providers:[provideNativeDateAdapter(),{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' },],
  templateUrl: './add-reservation-dialog.component.html',
  styleUrl: './add-reservation-dialog.component.css'
})
export class AddReservationDialogComponent {

  minDate: Date = new Date()
  startDate!: Date
  startDateCopy: Date = new Date(this.startDate)
  finalDate!: Date

  addReservationSub!: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { roomId: number},
    private dialogRef: MatDialogRef<AddReservationDialogComponent>, private reservationService: ReservationsApiService, 
    private authService: AuthService) {

  }

  setMinDateForFinalDate() {
    this.startDateCopy = new Date(this.startDate);
    this.startDateCopy.setDate(this.startDate.getDate() + 1)
  }

  onSave(): void {
    const reservation:AddReservation = {
      fechainicio: this.startDate,
      fechafin: this.finalDate,
      cliente: {
        id: this.authService.customerId!
      },
      habitacion: {
        id: this.data.roomId
      }
    }
    this.addReservationSub = this.reservationService.createReservation(reservation).subscribe(result => {
      this.dialogRef.close({reservation: reservation}); 
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if(this.addReservationSub)
      this.addReservationSub.unsubscribe()
  }
}
