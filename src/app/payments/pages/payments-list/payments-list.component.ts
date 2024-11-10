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
import { PaymentsApiService } from '../../../services/payments-api.service';
import { AuthService } from '../../../auth/services/auth.service';

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
  displayedColumns: string[] = []
  dataSource = new MatTableDataSource<Payment>([])

  payDetailsDialogSub!: Subscription

  allPaymentsSub!: Subscription
  paymentsByCustomerSub!: Subscription

  constructor(private dialog: MatDialog, public authService: AuthService, private paymentService: PaymentsApiService) {

    if (this.authService.customerRole == 'ADMIN') {
      this.displayedColumns = ['customer','room', 'total amount','start', 'final', 'payment date', 'method' ,'actions']
    } else if (this.authService.customerRole == 'USER') {
      this.displayedColumns = ['room', 'total amount','start', 'final', 'payment date', 'method' ,'actions']
    }

  }

  openPayDetailsDialog(payment: Payment): void {
    const dialogRef = this.dialog.open(PayDetailsDialogComponent, {
      data: { payment }
    })
    
    this.payDetailsDialogSub = dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  getAllPayments(){

    if(this.allPaymentsSub)
      this.allPaymentsSub.unsubscribe()

    this.allPaymentsSub = this.paymentService.getAllPagos().subscribe(result => {
      this.dataSource.data = result
    })
  }

  getPaymentsByCustomer() {

    if(this.paymentsByCustomerSub)
      this.paymentsByCustomerSub.unsubscribe()

    this.paymentsByCustomerSub = this.paymentService.getPaymentsByCustomer(this.authService.customerId!).subscribe(result => {
      this,this.dataSource.data = result
    })
  }

  ngOnInit(): void {
    if (this.authService.customerRole == 'ADMIN') {
      this.getAllPayments()
    } else if (this.authService.customerRole == 'USER') {
      this.getPaymentsByCustomer()
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    if(this.allPaymentsSub)
      this.allPaymentsSub.unsubscribe()
  }
}