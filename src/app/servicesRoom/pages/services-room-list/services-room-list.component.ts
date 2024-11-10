import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServiceReservation } from '../../models/serviceReservation';
import { DeleteDialogComponent } from '../../../core/components/delete-dialog/delete-dialog.component';
import { Subscription } from 'rxjs';
import { ServiceRoomDialogComponent } from '../../components/service-room-dialog/service-room-dialog.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { ServicesApiService } from '../../../services/services-api.service';
import { ServiceRoomAddDialogComponent } from '../../components/service-room-add-dialog/service-room-add-dialog.component';

@Component({
  selector: 'app-services-room-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, 
    MatIconModule, MatSelectModule, ReactiveFormsModule,MatTableModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './services-room-list.component.html',
  styleUrl: './services-room-list.component.css'
})
export class ServicesRoomListComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  displayedColumns: string[] = ['name', 'description', 'price', 'actions']
  dataSource = new MatTableDataSource<ServiceReservation>([]);

  dialogClosedSub!: Subscription
  serviceRoomDialogSub!: Subscription
  serviceRoomAddDialogSub!: Subscription
  allServiceSub!: Subscription
  deleteServiceSub!: Subscription

  constructor(private dialog: MatDialog, public authService: AuthService, 
    private serviceReservationService:ServicesApiService) {

  }

  openDeleteDialog(index: number, type: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { index, type }
    })
    
    this.dialogClosedSub = dialogRef.afterClosed().subscribe(result => {
      if (result?.confirm) {
        this.deleteServiceSub = this.serviceReservationService.deleteService(index).subscribe(result => {
          this.getAllServices()
        })
      }
    })
  }

  openServiceRoomDialog(serviceRoomData: ServiceReservation): void {
    const dialogRef = this.dialog.open(ServiceRoomDialogComponent, {
      data: { serviceRoomData } 
    });
  
    this.serviceRoomDialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.getAllServices()
      }
    });
  }

  openServiceRoomAddDialog(){
    const dialogRef = this.dialog.open(ServiceRoomAddDialogComponent);
  
    this.serviceRoomAddDialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllServices()
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    if (this.dialogClosedSub)
      this.dialogClosedSub.unsubscribe()

    if (this.serviceRoomDialogSub)
      this.serviceRoomDialogSub.unsubscribe()
  
    if(this.allServiceSub)
      this.allServiceSub.unsubscribe()
    
    if(this.serviceRoomAddDialogSub)
      this.serviceRoomAddDialogSub.unsubscribe()
    
    if(this.deleteServiceSub)
      this.deleteServiceSub.unsubscribe()
  }

  ngOnInit(): void {
    this.getAllServices()
  }

  getAllServices(){
    if(this.allServiceSub)
      this.allServiceSub.unsubscribe()

    this.allServiceSub = this.serviceReservationService.getAllServices().subscribe((result) => {
      this.dataSource.data = result
    })
  }

}