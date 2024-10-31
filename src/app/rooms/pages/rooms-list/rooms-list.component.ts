import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../core/components/delete-dialog/delete-dialog.component';
import { Subscription } from 'rxjs';
import { Room } from '../../models/Room';
import { RoomDialogComponent } from '../../components/room-dialog/room-dialog.component';
import { AuthService } from '../../../auth/services/auth.service';
import { AddReservationDialogComponent } from '../../../reservations/components/add-reservation-dialog/add-reservation-dialog.component';

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, 
    MatIconModule, MatSelectModule, ReactiveFormsModule,MatTableModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.css'
})
export class RoomsListComponent implements OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  displayedColumns: string[] = ['roomNumber', 'roomType', 'capacity', 'pricePerNight', 'roomStatus', 'actions']
  dataSource = new MatTableDataSource<Room>(ELEMENT_DATA)

  dialogClosedSub!: Subscription
  roomDialogSub!: Subscription
  addReservationDialogSub!: Subscription

  constructor(private dialog: MatDialog, public authService: AuthService) {}

  openDeleteDialog(index: number, type: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { index, type }
    })
    
    this.dialogClosedSub = dialogRef.afterClosed().subscribe(result => {
      if (result?.confirm) {
        this.deleteRoom(result.index)
      } else {
        console.log('Deletion canceled')
      }
    })
  }

  openRoomDialog(mode: 'add' | 'edit', roomData?: Room): void {
    const dialogRef = this.dialog.open(RoomDialogComponent, {
      data: { mode, roomData }  // Se pasa el modo y los datos de la habitación (solo en modo 'edit')
    });
  
    this.roomDialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (mode === 'add') {
          this.addRoom(result.room);  // Función para añadir una habitación
        } else if (mode === 'edit') {
          this.updateRoom(result.room);  // Función para actualizar una habitación
        }
      }
    });
  }

  openAddReservationDialog(roomId:number){
    const dialogRef = this.dialog.open(AddReservationDialogComponent, {
      data: { roomId }
    });
  
    this.addReservationDialogSub = dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result.room)
          //aqui ya no sería result, sino los datos para la reserva
        }  
    })
  }

  deleteRoom(index: number): void {
    console.log(`Deleting item at index ${index}...`)
    // Simula la eliminación llamando a un endpoint (sólo un console log en este caso)
    console.log('Updated items:', index)
  }

  addRoom(room : any) {
    console.log(room)
  }

  updateRoom(room : any) {
    console.log(room)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    if (this.dialogClosedSub)
      this.dialogClosedSub.unsubscribe()
    if (this.roomDialogSub)
      this.roomDialogSub.unsubscribe()
    if (this.addReservationDialogSub)
      this.addReservationDialogSub.unsubscribe()
  }
}

const ELEMENT_DATA: Room[] = [
  {id: 1, roomNumber: '1A', roomType: 'SINGLE', capacity: 1, pricePerNight: 20.2, roomStatus: 'AVAILABLE'},
  {id: 2, roomNumber: '2A', roomType: 'SINGLE', capacity: 1, pricePerNight: 30.2, roomStatus: 'AVAILABLE'},
  {id: 3, roomNumber: '3A', roomType: 'SINGLE', capacity: 1, pricePerNight: 40.2, roomStatus: 'AVAILABLE'},
  {id: 4, roomNumber: '4A', roomType: 'DOUBLE', capacity: 2, pricePerNight: 20.1, roomStatus: 'AVAILABLE'},
  {id: 5, roomNumber: '5A', roomType: 'SUITE', capacity: 3, pricePerNight: 20.0, roomStatus: 'AVAILABLE'},
  {id: 6, roomNumber: '6A', roomType: 'SINGLE', capacity: 1, pricePerNight: 34.2, roomStatus: 'AVAILABLE'},
  {id: 7, roomNumber: '7A', roomType: 'DOUBLE', capacity: 2, pricePerNight: 21.2, roomStatus: 'AVAILABLE'},
  {id: 8, roomNumber: '8A', roomType: 'SINGLE', capacity: 1, pricePerNight: 123.2, roomStatus: 'AVAILABLE'},
  {id: 9, roomNumber: '9A', roomType: 'SUITE', capacity: 2, pricePerNight: 29.2, roomStatus: 'AVAILABLE'},
  {id: 10, roomNumber: '10A', roomType: 'DOUBLE', capacity: 2, pricePerNight: 76.2, roomStatus: 'AVAILABLE'},
  {id: 11, roomNumber: '11A', roomType: 'SINGLE', capacity: 1, pricePerNight: 42.2, roomStatus: 'AVAILABLE'},
  {id: 12, roomNumber: '12A', roomType: 'SUITE', capacity: 1, pricePerNight: 102.2, roomStatus: 'AVAILABLE'},
  {id: 13, roomNumber: '13A', roomType: 'SUITE', capacity: 1, pricePerNight: 220.2, roomStatus: 'AVAILABLE'},
  {id: 14, roomNumber: '14A', roomType: 'SINGLE', capacity: 1, pricePerNight: 120.2, roomStatus: 'AVAILABLE'},
  {id: 15, roomNumber: '15A', roomType: 'DOUBLE', capacity: 2, pricePerNight: 320.2, roomStatus: 'AVAILABLE'},
  {id: 16, roomNumber: '16A', roomType: 'SINGLE', capacity: 1, pricePerNight: 120.2, roomStatus: 'AVAILABLE'},
  {id: 17, roomNumber: '17A', roomType: 'SUITE', capacity: 4, pricePerNight: 320.2, roomStatus: 'AVAILABLE'}
];
