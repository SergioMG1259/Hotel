import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Payment } from '../payments/models/payment';
import { AddPayment } from '../payments/models/addPayment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsApiService {


  basePath = 'http://localhost:8105/api/v1/admin/pagos';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) {
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError('Something happened with request, please try again later');
  }

  getAllPagos(){
    return this.http.get<Payment[]>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getPaymentsByCustomer(id:number) {
    return this.http.get<Payment[]>(`${this.basePath}/cliente/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  createPayment(payment: AddPayment) {
    return this.http.post<Payment>(this.basePath, payment, this.httpOptions)
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }
}
