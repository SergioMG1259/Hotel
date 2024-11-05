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
  dataSource = new MatTableDataSource<ServiceReservation>(ELEMENT_DATA)

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reservationId: number},
    private dialogRef: MatDialogRef<PayReservationDialogComponent>) {

  }

  onClose(): void {
    this.dialogRef.close();  // Cierra el diálogo sin cambios
  }

  getTotalPrice(): number {
    return ELEMENT_DATA.reduce((total, element) => total + element.precio, 0);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
}

const ELEMENT_DATA: ServiceReservation[] = [
  // {id: 1, name: 'servicio 1', description: 'descripción larga aqui 1', price: 15.2},
  // {id: 2, name: 'servicio 2', description: 'descripción larga aqui 2', price: 12.3},
  // {id: 3, name: 'servicio 3', description: 'descripción larga aqui 3', price: 13.7}
]