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
import { Payment } from '../../models/payment';
import { ServicesRoomApiService } from '../../../services/services-room-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pay-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, FormsModule, MatDatepickerModule, MatPaginatorModule, MatTableModule],
  templateUrl: './pay-details-dialog.component.html',
  styleUrl: './pay-details-dialog.component.css'
})
export class PayDetailsDialogComponent {

  payment!: Payment

  @ViewChild(MatPaginator) paginator!: MatPaginator
  displayedColumns: string[] = ['name', 'description', 'price']
  dataSource = new MatTableDataSource<ServiceReservation>([])

  allServicesRoomSub!: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { payment: Payment},
    private dialogRef: MatDialogRef<PayDetailsDialogComponent>, private servicesRoomService : ServicesRoomApiService) {
      this.payment = this.data.payment
  }

  onClose(): void {
    this.dialogRef.close();  // Cierra el diálogo sin cambios
  }

  getTotalPrice(): number {
    return this.dataSource.data.reduce((total, element) => total + element.precio, 0)
  }

  ngOnInit(): void {
    this.servicesRoomService.getServicesByReservation(this.payment.reserva.id).subscribe(result => {
      this.dataSource.data = result
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    if(this.allServicesRoomSub)
      this.allServicesRoomSub.unsubscribe()
  }
}