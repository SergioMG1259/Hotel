import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ServiceReservation } from '../../models/serviceReservation';
import { ServiceReservationAdd } from '../../models/serviceReservationAdd';
import { ServicesApiService } from '../../../services/services-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service-room-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './service-room-add-dialog.component.html',
  styleUrl: './service-room-add-dialog.component.css'
})
export class ServiceRoomAddDialogComponent {

  name:string = ''
  descripcion:string = ''
  price: number = 0
  addServiceSub!:Subscription

  constructor(
    private dialogRef: MatDialogRef<ServiceRoomAddDialogComponent>, private serviceRoom: ServicesApiService
  ) {

  }

  onSave(): void {
    const service:ServiceReservationAdd = {
      nombre: this.name,
      descripcion: this.descripcion,
      precio: this.price
    }

    this.addServiceSub = this.serviceRoom.createService(service).subscribe(result => {
      this.dialogRef.close({service : service});  // Devuelve los datos de la habitación
    })

  }

  onCancel(): void {
    this.dialogRef.close();  // Cierra el diálogo sin cambios
  }

  ngOnDestroy(): void {
    if (this.addServiceSub)
      this.addServiceSub.unsubscribe()
  }
}
