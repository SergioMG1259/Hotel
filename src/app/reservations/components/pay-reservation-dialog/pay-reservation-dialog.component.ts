import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServiceReservation } from '../../../servicesRoom/models/serviceReservation';
import { ServicesRoomApiService } from '../../../services/services-room-api.service';
import { Subscription } from 'rxjs';
import { Reservation } from '../../models/reservation';
import { PaymentsApiService } from '../../../services/payments-api.service';
import { AddPayment } from '../../../payments/models/addPayment';

@Component({
  selector: 'app-pay-reservation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, FormsModule, MatDatepickerModule, MatPaginatorModule, MatTableModule],
  templateUrl: './pay-reservation-dialog.component.html',
  styleUrl: './pay-reservation-dialog.component.css'
})
export class PayReservationDialogComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  displayedColumns: string[] = ['name', 'description', 'price']
  dataSource = new MatTableDataSource<ServiceReservation>([])
  
  method:string = 'TARJETA'

  getServicesSub!: Subscription
  addPaymentSub!: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reservation: Reservation},
    private dialogRef: MatDialogRef<PayReservationDialogComponent>, private servicesRoomService : ServicesRoomApiService,
    private paymentService: PaymentsApiService) {

  }

  onClose(): void {
    this.dialogRef.close();
  }

  onPay(): void {

    const addPayment: AddPayment = {
      reserva: {
        id: this.data.reservation.id
      },
      metododepago: this.method
    }

    this.addPaymentSub = this.paymentService.createPayment(addPayment).subscribe(result => {
      this.dialogRef.close({payment:addPayment})
    })
  }

  getTotalPrice(): number {
    return this.dataSource.data.reduce((total, element) => total + element.precio, 0);
  }

  ngOnInit(): void {
    
    if(this.getServicesSub)
      this.getServicesSub.unsubscribe()

    this.getServicesSub = this.servicesRoomService.getServicesByReservation(this.data.reservation.id).subscribe(result => {
      this.dataSource.data = result
    })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    if(this.getServicesSub)
      this.getServicesSub.unsubscribe()

    if(this.addPaymentSub)
      this.addPaymentSub.unsubscribe()
  }
}