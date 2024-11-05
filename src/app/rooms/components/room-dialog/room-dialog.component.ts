import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Room } from '../../models/Room';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RoomsApiService } from '../../../services/rooms-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './room-dialog.component.html',
  styleUrl: './room-dialog.component.css'
})
export class RoomDialogComponent {
  
  room!:Room
  editRoomSub!: Subscription
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { roomData?: Room },
    private dialogRef: MatDialogRef<RoomDialogComponent>, private roomService:RoomsApiService
  ) {
    if (data.roomData) {
      this.room = { ...data.roomData }  // Inicializar con los datos para edición
    } 
  }

  onSave(): void {
    this.editRoomSub = this.roomService.updateRoom(this.room.id,this.room).subscribe(resul => {
      this.dialogRef.close({room : this.room});  // Devuelve los datos de la habitación
    })
  }

  onCancel(): void {
    this.dialogRef.close();  // Cierra el diálogo sin cambios
  }

  ngOnDestroy(): void {
    if (this.editRoomSub)
      this.editRoomSub.unsubscribe()
  }
}
