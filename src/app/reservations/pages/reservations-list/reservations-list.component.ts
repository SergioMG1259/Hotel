import { Component, ViewChild } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { ViewServicesReservationDialogComponent } from '../../components/view-services-reservation-dialog/view-services-reservation-dialog.component';
import { EditServicesReservationDialogComponent } from '../../components/edit-services-reservation-dialog/edit-services-reservation-dialog.component';
import { PayReservationDialogComponent } from '../../components/pay-reservation-dialog/pay-reservation-dialog.component';

@Component({
  selector: 'app-reservations-list',
  standalone: true,
  imports: [CommonModule ,MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, 
    MatIconModule, MatSelectModule, ReactiveFormsModule,MatTableModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.css'
})
export class ReservationsListComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  displayedColumns: string[] = []
  dataSource = new MatTableDataSource<Reservation>(ELEMENT_DATA)

  viewServicseReservationDialogSub!: Subscription
  editServicseReservationDialogSub!: Subscription
  payReservationDialogSub!: Subscription

  constructor(private dialog: MatDialog, public authService: AuthService) {

    if (this.authService.userRol == 'admin') {
      this.displayedColumns = ['customer', 'room', 'cost', 'start', 'final', 'status' ,'actions']
    } else if (this.authService.userRol == 'customer') {
      this.displayedColumns = ['room', 'cost', 'start', 'final', 'status' ,'actions']
    }
    
  }

  openViewServicesReservationDialog(reservationId: number): void {
    const dialogRef = this.dialog.open(ViewServicesReservationDialogComponent, {
      data: { reservationId }  // Se pasa el modo y los datos de la habitación (solo en modo 'edit')
    });
  }

  openEditServicesReservationDialog(reservationId: number): void {
    const dialogRef = this.dialog.open(EditServicesReservationDialogComponent, {
      data: { reservationId }
    })
    
    this.editServicseReservationDialogSub = dialogRef.afterClosed().subscribe(result => {

    })
  }

  openPayReservationDialog(reservationId: number): void {
    const dialogRef = this.dialog.open(PayReservationDialogComponent, {
      data: { reservationId }
    })
    
    this.payReservationDialogSub = dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    if (this.viewServicseReservationDialogSub)
      this.viewServicseReservationDialogSub.unsubscribe()
    if (this.editServicseReservationDialogSub)
      this.editServicseReservationDialogSub.unsubscribe()
    if (this.payReservationDialogSub)
      this.payReservationDialogSub.unsubscribe()
  }

}

const ELEMENT_DATA: Reservation[] = [
  {id: 1, customerName: 'nombre 1', roomNumber: 'room 1', status: 'CONFIRMED' ,cost: 35.2, startDate: new Date(), finalDate: new Date(), services: []},
  {id: 2, customerName: 'nombre 2', roomNumber: 'room 2', status: 'RESERVED' , cost: 22.3, startDate: new Date(), finalDate: new Date(), services: []},
  {id: 3, customerName: 'nombre 3', roomNumber: 'room 3', status: 'RESERVED' , cost: 43.7, startDate: new Date(), finalDate: new Date(), services: []},
  {id: 4, customerName: 'nombre 4', roomNumber: 'room 4', status: 'RESERVED' , cost: 21.2, startDate: new Date(), finalDate: new Date(), services: []},
  {id: 5, customerName: 'nombre 5', roomNumber: 'room 5', status: 'RESERVED' , cost: 77.1, startDate: new Date(), finalDate: new Date(), services: []},
]