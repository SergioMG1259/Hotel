import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceReservation } from '../servicesRoom/models/serviceReservation';
import { catchError, retry, throwError } from 'rxjs';
import { ServiceReservationAdd } from '../servicesRoom/models/serviceReservationAdd';

@Injectable({
  providedIn: 'root'
})
export class ServicesApiService {

  basePath = 'http://localhost:8105/api/v1/admin/servicios';

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

  getAllServices(){
    return this.http.get<ServiceReservation[]>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  createService(service: ServiceReservationAdd) {
    return this.http.post<ServiceReservation>(this.basePath, service, this.httpOptions)
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  updateService(id:number, servicio: ServiceReservation) {
    return this.http.put<ServiceReservation>(`${this.basePath}/${id}`, servicio, this.httpOptions)
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  deleteService(id: number) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
