import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../../auth/services/auth.service';
import { ServiceReservation } from '../../../servicesRoom/models/serviceReservation';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServicesRoomApiService } from '../../../services/services-room-api.service';

@Component({
  selector: 'app-view-services-reservation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, FormsModule, MatDatepickerModule, MatPaginatorModule, MatTableModule],
  templateUrl: './view-services-reservation-dialog.component.html',
  styleUrl: './view-services-reservation-dialog.component.css'
})
export class ViewServicesReservationDialogComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  displayedColumns: string[] = ['name', 'description', 'price']
  dataSource = new MatTableDataSource<ServiceReservation>([]);

  getServicesSub!: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reservationId: number},
    private dialogRef: MatDialogRef<ViewServicesReservationDialogComponent>, 
    public authService: AuthService, private servicesRoomService : ServicesRoomApiService) {

  }

  onClose(): void {
    this.dialogRef.close();  // Cierra el diálogo sin cambios
  }

  ngOnInit(): void {
    
    if(this.getServicesSub)
      this.getServicesSub.unsubscribe()

    this.getServicesSub = this.servicesRoomService.getServicesByReservation(this.data.reservationId).subscribe(result => {
      this.dataSource.data = result
    })

  }

  getTotalPrice(): number {
    return this.dataSource.data.reduce((total, element) => total + element.precio, 0);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    if(this.getServicesSub)
      this.getServicesSub.unsubscribe()
  }
}