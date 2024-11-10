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
import { ServiceEditableReservation } from '../../../servicesRoom/models/serviceEditableReservation';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ServicesRoomApiService } from '../../../services/services-room-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-services-reservation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, FormsModule, MatDatepickerModule, MatPaginatorModule, MatTableModule, MatCheckboxModule],
  templateUrl: './edit-services-reservation-dialog.component.html',
  styleUrl: './edit-services-reservation-dialog.component.css'
})
export class EditServicesReservationDialogComponent {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator
  displayedColumns: string[] = ['name', 'description', 'price', 'selected']
  dataSource = new MatTableDataSource<ServiceEditableReservation>([])
  getServicesRoomToSelectSub!: Subscription
  addServiceRoomToReservationSub!: Subscription
  removeServiceRoomSub!: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reservationId: number},
    private dialogRef: MatDialogRef<EditServicesReservationDialogComponent>, 
    private serviceRoomService: ServicesRoomApiService) {

  }

  onClose(): void {
    this.dialogRef.close()  // Cierra el diálogo sin cambios
  }

  getTotalPrice(): number {
    return this.dataSource.data.reduce((total, element) => {
      return element.selected ? total + element.precio : total;
    }, 0)
  }

  selectService(serviceId: number) {
    this.addServiceRoomToReservationSub = this.serviceRoomService.addServiceToReservation(this.data.reservationId,serviceId)
      .subscribe(result => {})
  }

  removeService(serviceId: number) {
    this.removeServiceRoomSub = this.serviceRoomService.removeServiceToReservation(this.data.reservationId,serviceId)
    .subscribe(result => {})
  }

  check(serviceId:number, value: boolean) {
    if(value == true) {
      this.selectService(serviceId)
    } else {
      this.removeService(serviceId)
    }
  }

  ngOnInit(): void {
    this.getServicesRoomToSelectSub = this.serviceRoomService.getServicesByReservationToSelect(this.data.reservationId)
      .subscribe(result => {
        this.dataSource.data = result
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    if(this.getServicesRoomToSelectSub)
      this.getServicesRoomToSelectSub.unsubscribe()

    if(this.addServiceRoomToReservationSub)
      this.addServiceRoomToReservationSub.unsubscribe()

    if(this.removeServiceRoomSub)
      this.removeServiceRoomSub.unsubscribe()
  }
}