import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Reservation } from '../reservations/models/reservation';
import { AddReservation } from '../reservations/models/addReservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationsApiService {

  basePath = 'http://localhost:8105/api/v1/admin/reservas';

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

  getAllReservations(){
    return this.http.get<Reservation[]>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getReservationsByCustomer(id:number) {
    return this.http.get<Reservation[]>(`${this.basePath}/cliente/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  cancelReservation(reservationId:number) {
    return this.http.post<Reservation>(`${this.basePath}/${reservationId}/cancel`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  endReservation(reservationId:number) {
    return this.http.post<Reservation>(`${this.basePath}/${reservationId}/end`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  createReservation(reservation: AddReservation) {
    return this.http.post<Reservation>(`${this.basePath}`, reservation ,this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
}
