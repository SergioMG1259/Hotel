import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ServiceReservation } from '../../models/serviceReservation';

@Component({
  selector: 'app-service-room-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './service-room-dialog.component.html',
  styleUrl: './service-room-dialog.component.css'
})
export class ServiceRoomDialogComponent {

  service:any = {}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit', serviceRoomData?: ServiceReservation },
    private dialogRef: MatDialogRef<ServiceRoomDialogComponent>
  ) {
    if (data.mode === 'edit' && data.serviceRoomData) {
      this.service = { ...data.serviceRoomData }  // Inicializar con los datos para edición
      console.log(this.service)
    }
  }

  onSave(): void {
    this.dialogRef.close({service : this.service});  // Devuelve los datos de la habitación
  }

  onCancel(): void {
    this.dialogRef.close();  // Cierra el diálogo sin cambios
  }

}
