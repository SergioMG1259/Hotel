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
  dataSource = new MatTableDataSource<ServiceEditableReservation>(ELEMENT_DATA)

  initialDataState: ServiceEditableReservation[] = JSON.parse(JSON.stringify(ELEMENT_DATA));

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reservationId: number},
    private dialogRef: MatDialogRef<EditServicesReservationDialogComponent>) {

  }

  onClose(): void {
    this.dialogRef.close()  // Cierra el diálogo sin cambios
  }

  onSave(): void {
    const selectedItems = ELEMENT_DATA.filter(item => item.selected);
    console.log(selectedItems)
    this.dialogRef.close()
  }

  getTotalPrice(): number {
    return ELEMENT_DATA.reduce((total, element) => {
      return element.selected ? total + element.price : total;
    }, 0)
  }

  isDataChanged(): boolean {
    return ELEMENT_DATA.every((item, index) => item.selected === this.initialDataState[index].selected);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
}

const ELEMENT_DATA: ServiceEditableReservation[] = [
  {id: 1, name: 'servicio 1', description: 'descripción larga aqui 1', price: 15.2, selected: true},
  {id: 2, name: 'servicio 2', description: 'descripción larga aqui 2', price: 12.3, selected: false},
  {id: 3, name: 'servicio 3', description: 'descripción larga aqui 3', price: 13.7, selected: true},
  {id: 4, name: 'servicio 4', description: 'descripción larga aqui 4', price: 11.1, selected: false},
  {id: 5, name: 'servicio 5', description: 'descripción larga aqui 5', price: 17.5, selected: false},
]