import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { ServiceReservation } from '../servicesRoom/models/serviceReservation';
import { ServiceEditableReservation } from '../servicesRoom/models/serviceEditableReservation';

@Injectable({
  providedIn: 'root'
})
export class ServicesRoomApiService {

  basePath = 'http://localhost:8105/api/v1/admin/reserva-servicios';

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

  getServicesByReservation(id:number){
    return this.http.get<ServiceReservation[]>(`${this.basePath}/${id}/servicios`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getServicesByReservationToSelect(reservationId:number){
    return this.http.get<ServiceEditableReservation[]>(`${this.basePath}/${reservationId}/servicios/toSelect`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  addServiceToReservation(reservationId:number, serviceId:number) {
    let params = new HttpParams();
    params = params.append("serviceId",serviceId)
    return this.http.post<ServiceReservation>(`${this.basePath}/${reservationId}/add-service`, {} , {params, ...this.httpOptions })
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  removeServiceToReservation(reservationId:number, serviceId:number) {
    return this.http.delete<ServiceReservation>(`${this.basePath}/${reservationId}/remove-service/${serviceId}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
}
