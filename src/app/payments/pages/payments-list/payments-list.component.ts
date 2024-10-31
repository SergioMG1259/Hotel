import { CommonModule } from '@angular/common';
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
import { Payment } from '../../models/payment';
import { Subscription } from 'rxjs';
import { PayDetailsDialogComponent } from '../../components/pay-details-dialog/pay-details-dialog.component';

@Component({
  selector: 'app-payments-list',
  standalone: true,
  imports: [CommonModule ,MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, 
    MatIconModule, MatSelectModule, ReactiveFormsModule,MatTableModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './payments-list.component.html',
  styleUrl: './payments-list.component.css'
})
export class PaymentsListComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  displayedColumns: string[] = ['reservation', 'total amount', 'start', 'final', 'payment date', 'method' ,'actions']
  dataSource = new MatTableDataSource<Payment>(ELEMENT_DATA)

  payDetailsDialogSub!: Subscription

  constructor(private dialog: MatDialog) {}

  openPayDetailsDialog(paymentnId: number): void {
    const dialogRef = this.dialog.open(PayDetailsDialogComponent, {
      data: { paymentnId }
    })
    
    this.payDetailsDialogSub = dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
}

const ELEMENT_DATA: Payment[] = [
  {id: 1, reservation: 'room 1', totalAmount: 120, startDate: new Date(), finalDate: new Date(), paymentDate: new Date(), paymentMethod: 'CARD'},
  {id: 1, reservation: 'room 2', totalAmount: 112, startDate: new Date(), finalDate: new Date(), paymentDate: new Date(), paymentMethod: 'CARD'},
  {id: 1, reservation: 'room 3', totalAmount: 140, startDate: new Date(), finalDate: new Date(), paymentDate: new Date(), paymentMethod: 'CARD'},
  {id: 1, reservation: 'room 4', totalAmount: 121, startDate: new Date(), finalDate: new Date(), paymentDate: new Date(), paymentMethod: 'CARD'},
  {id: 1, reservation: 'room 5', totalAmount: 110, startDate: new Date(), finalDate: new Date(), paymentDate: new Date(), paymentMethod: 'CARD'},
  {id: 1, reservation: 'room 6', totalAmount: 80, startDate: new Date(), finalDate: new Date(), paymentDate: new Date(), paymentMethod: 'CARD'},
  {id: 1, reservation: 'room 7', totalAmount: 190, startDate: new Date(), finalDate: new Date(), paymentDate: new Date(), paymentMethod: 'CARD'}
]