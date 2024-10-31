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
  dataSource = new MatTableDataSource<ServiceReservation>(ELEMENT_DATA)

  dialogClosedSub!: Subscription
  serviceRoomDialogSub!: Subscription

  constructor(private dialog: MatDialog, public authService: AuthService) {}

  openDeleteDialog(index: number, type: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { index, type }
    })
    
    this.dialogClosedSub = dialogRef.afterClosed().subscribe(result => {
      if (result?.confirm) {
        this.deleteServiceRoom(result.index)
      } else {
        console.log('Deletion canceled')
      }
    })
  }

  deleteServiceRoom(index: number): void {
    console.log(`Deleting service at index ${index}...`)
    // Simula la eliminación llamando a un endpoint (sólo un console log en este caso)
    console.log('Updated services:', index)
  }

  openServiceRoomDialog(mode: 'add' | 'edit', serviceRoomData?: ServiceReservation): void {
    const dialogRef = this.dialog.open(ServiceRoomDialogComponent, {
      data: { mode, serviceRoomData }  // Se pasa el modo y los datos de la habitación (solo en modo 'edit')
    });
  
    this.serviceRoomDialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (mode === 'add') {
          this.addService(result.service);  // Función para añadir una habitación
        } else if (mode === 'edit') {
          this.updateService(result.service);  // Función para actualizar una habitación
        }
      }
    });
  }

  addService(service : any) {
    console.log(service)
  }

  updateService(service : any) {
    console.log(service)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    if (this.dialogClosedSub)
      this.dialogClosedSub.unsubscribe()
    if (this.serviceRoomDialogSub)
      this.serviceRoomDialogSub.unsubscribe()
  }

}

const ELEMENT_DATA: ServiceReservation[] = [
  {id: 1, name: 'servicio 1', description: 'descripción larga aqui 1', price: 15.2},
  {id: 2, name: 'servicio 2', description: 'descripción larga aqui 2', price: 12.3},
  {id: 3, name: 'servicio 3', description: 'descripción larga aqui 3', price: 13.7},
  {id: 4, name: 'servicio 4', description: 'descripción larga aqui 4', price: 11.1},
  {id: 5, name: 'servicio 5', description: 'descripción larga aqui 5', price: 17.5},
]