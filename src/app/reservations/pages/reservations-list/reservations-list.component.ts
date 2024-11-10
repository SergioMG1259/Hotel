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
import { ReservationsApiService } from '../../../services/reservations-api.service';
import { CancelDialogComponent } from '../../components/cancel-dialog/cancel-dialog.component';
import { EndDialogComponent } from '../../components/end-dialog/end-dialog.component';

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
  dataSource = new MatTableDataSource<Reservation>([]);
  reservations: Reservation[] = []

  viewServicseReservationDialogSub!: Subscription
  editServicseReservationDialogSub!: Subscription
  payReservationDialogSub!: Subscription
  allReservationServiceSub!: Subscription
  reservationsByCustomerSub!: Subscription
  cancelReservationSub!: Subscription

  constructor(private dialog: MatDialog, public authService: AuthService, private reservationService: ReservationsApiService) {

    if (this.authService.customerRole == 'ADMIN') {
      this.displayedColumns = ['customer', 'room', 'cost', 'start', 'final', 'status' ,'actions']
    } else if (this.authService.customerRole == 'USER') {
      this.displayedColumns = ['room', 'cost', 'start', 'final', 'status' ,'actions']
    }
    
  }

  openViewServicesReservationDialog(reservationId: number): void {
    const dialogRef = this.dialog.open(ViewServicesReservationDialogComponent, {
      data: { reservationId }
    });
  }

  //para añadir o quitar servicios a la reserva
  openEditServicesReservationDialog(reservationId: number): void {
    const dialogRef = this.dialog.open(EditServicesReservationDialogComponent, {
      data: { reservationId }
    })
  }

  openPayReservationDialog(reservation: Reservation): void {
    const dialogRef = this.dialog.open(PayReservationDialogComponent, {
      data: { reservation }
    })
    
    this.payReservationDialogSub = dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getReservationsByRol()
      }
    })
  }

  openCancelReservationDialog(reservationId: number) {
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      data: { reservationId }
    })

    this.cancelReservationSub = dialogRef.afterClosed().subscribe(result => {
      if(result && result.canceled == true) {
        this.getReservationsByRol()
      }
    })
  }

  openEndReservationDialog(reservationId: number) {
    const dialogRef = this.dialog.open(EndDialogComponent, {
      data: { reservationId }
    })

    this.cancelReservationSub = dialogRef.afterClosed().subscribe(result => {
      if(result && result.finalized == true) {
        this.getReservationsByRol()
      }
    })
  }

  getAllReservations() {

    if(this.allReservationServiceSub)
      this.allReservationServiceSub.unsubscribe()

    this.allReservationServiceSub = this.reservationService.getAllReservations().subscribe((result) => {
      this.reservations = result
      this.dataSource.data  = this.reservations
    })
  }

  getReservationsByCustomer() {
    if(this.reservationsByCustomerSub)
      this.reservationsByCustomerSub.unsubscribe()

    this.reservationsByCustomerSub = this.reservationService.getReservationsByCustomer(this.authService.customerId!)
      .subscribe(result => {
      this.reservations = result
      this.dataSource.data  = this.reservations
    })
  }

  getReservationsByRol() {
    if (this.authService.customerRole == 'ADMIN') {
      this.getAllReservations()
    } else if (this.authService.customerRole == 'USER') {
      this.getReservationsByCustomer()
    }
  }

  ngOnInit(): void {
    this.getReservationsByRol()
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

    if(this.allReservationServiceSub)
      this.allReservationServiceSub.unsubscribe()

    if(this.reservationsByCustomerSub)
      this.reservationsByCustomerSub.unsubscribe()

    if(this.cancelReservationSub)
      this.cancelReservationSub.unsubscribe()
  }

}