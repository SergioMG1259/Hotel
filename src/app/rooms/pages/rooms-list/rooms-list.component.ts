import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RoomsApiService } from '../../../services/rooms-api.service';
import { CommonModule } from '@angular/common';
import { RoomAddDialogComponent } from '../../components/room-add-dialog/room-add-dialog.component';

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, 
    MatIconModule, MatSelectModule, ReactiveFormsModule,MatTableModule, MatPaginatorModule, MatDialogModule, 
    CommonModule, FormsModule],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.css'
})
export class RoomsListComponent implements OnDestroy {

  capacity:number|null = null
  status:string|null = "DEFAULT"
  type:string|null = "DEFAULT"
  minPrice:number|null = null
  maxPrice:number|null = null

  @ViewChild(MatPaginator) paginator!: MatPaginator
  displayedColumns: string[] = ['roomNumber', 'roomType', 'capacity', 'pricePerNight', 'roomStatus', 'actions']
  rooms:Room[] = []
  
  dataSource = new MatTableDataSource<Room>([]);

  dialogClosedSub!: Subscription
  roomEditDialogSub!: Subscription
  roomAddDialogSub!: Subscription
  addReservationDialogSub!: Subscription

  roomSubscription: Subscription | null = null;
  deleteRoomSub!: Subscription

  constructor(private dialog: MatDialog, public authService: AuthService, private roomService:RoomsApiService) {}

  openDeleteDialog(index: number, type: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { index, type }
    })
    
    this.dialogClosedSub = dialogRef.afterClosed().subscribe(result => {
      if (result?.confirm) {
        this.deleteRoomSub = this.roomService.deleteRoom(index).subscribe(result => {
          this.applyFilters()
        })
      }
    })
  }

  openEditRoomDialog(roomData: Room): void {
    const dialogRef = this.dialog.open(RoomDialogComponent, {
      data: { roomData }  // Se pasa el modo y los datos de la habitación (solo en modo 'edit')
    });

    this.roomEditDialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.applyFilters()
          // this.updateRoom(result.room);
      }
    });
  }

  openAddRoomDialog(): void {
    const dialogRef = this.dialog.open(RoomAddDialogComponent);
    this.roomAddDialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result && result.added == true) {
        this.applyFilters()
          // this.addRoom(result.room);
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

    if (this.roomEditDialogSub)
      this.roomEditDialogSub.unsubscribe()

    if (this.addReservationDialogSub)
      this.addReservationDialogSub.unsubscribe()

    if (this.roomSubscription)
      this.roomSubscription.unsubscribe()

    if(this.roomAddDialogSub)
      this.roomAddDialogSub.unsubscribe()

    if(this.deleteRoomSub)
      this.deleteRoomSub.unsubscribe()
  }

  ngOnInit(): void {
    this.applyFilters()
  }

  applyFilters() {
    
    if (this.roomSubscription) {
      this.roomSubscription.unsubscribe();
    }

    if(this.status == 'DEFAULT')this.status = null
    if(this.type == 'DEFAULT')this.type = null

   this.roomSubscription = this.roomService.getFilteredRooms(this.capacity, this.status, this.type, this.minPrice, this.maxPrice)
      .subscribe(
        (rooms) => {
          this.rooms = rooms
          this.dataSource.data = this.rooms
        },
        (error) => {
          console.error('Error fetching filtered rooms:', error);
        }
      );
  }
}
