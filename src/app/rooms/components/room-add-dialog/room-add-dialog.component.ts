import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AddRoom } from '../../models/AddRoom';
import { Subscription } from 'rxjs';
import { RoomsApiService } from '../../../services/rooms-api.service';

@Component({
  selector: 'app-room-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './room-add-dialog.component.html',
  styleUrl: './room-add-dialog.component.css'
})
export class RoomAddDialogComponent {
  
  roomNumber:string = ''
  capacity:number = 0
  type:string = 'INDIVIDUAL'
  price:number = 0.0
  status:string = 'DISPONIBLE'

  addRoomSub!: Subscription

  constructor(private dialogRef: MatDialogRef<RoomAddDialogComponent>, private roomService:RoomsApiService
  ) {
    
  }

  onSave(): void {
    const room:AddRoom = {
      capacidad: this.capacity,
      numerohabitacion:this.roomNumber,
      tipo_habitacion:this.type,
      preciopornoche:this.price,
      estado_habitacion:this.status
    }

    this.addRoomSub = this.roomService.createRoom(room).subscribe(result => {
      this.dialogRef.close({room:room,added:true});
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.addRoomSub)
      this.addRoomSub.unsubscribe()
  }
}
