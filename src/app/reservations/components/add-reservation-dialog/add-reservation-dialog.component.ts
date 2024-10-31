import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-reservation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, FormsModule, MatDatepickerModule],
  providers:[provideNativeDateAdapter()],
  templateUrl: './add-reservation-dialog.component.html',
  styleUrl: './add-reservation-dialog.component.css'
})
export class AddReservationDialogComponent {

  minDate: Date = new Date()
  startDate!: Date
  startDateCopy: Date = new Date(this.startDate)

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { roomId: number},
    private dialogRef: MatDialogRef<AddReservationDialogComponent>) {

  }

  setMinDateForFinalDate() {
    this.startDateCopy = new Date(this.startDate);
    this.startDateCopy.setDate(this.startDate.getDate() + 1)
  }

  onSave(): void {
    this.dialogRef.close({room: this.data.roomId});  // Devuelve los datos de la habitación
  }

  onCancel(): void {
    this.dialogRef.close();  // Cierra el diálogo sin cambios
  }

}
