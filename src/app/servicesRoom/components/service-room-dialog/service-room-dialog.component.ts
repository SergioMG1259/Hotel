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
import { ServicesApiService } from '../../../services/services-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service-room-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './service-room-dialog.component.html',
  styleUrl: './service-room-dialog.component.css'
})
export class ServiceRoomDialogComponent {

  service!:ServiceReservation
  serviceSub!:Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { serviceRoomData: ServiceReservation },
    private dialogRef: MatDialogRef<ServiceRoomDialogComponent>, private serviceRoomService:ServicesApiService
  ) {
    if (data.serviceRoomData) {
      this.service = { ...data.serviceRoomData }  // Inicializar con los datos para edición
    }
  }

  onSave(): void {
    this.serviceSub = this.serviceRoomService.updateService(this.service.id,this.service).subscribe(result => {
      this.dialogRef.close({service : this.service});  // Devuelve los datos de la habitación
    })
  }

  onCancel(): void {
    this.dialogRef.close();  // Cierra el diálogo sin cambios
  }

  ngOnDestroy(): void {
    if (this.serviceSub)
      this.serviceSub.unsubscribe()
  }
}
