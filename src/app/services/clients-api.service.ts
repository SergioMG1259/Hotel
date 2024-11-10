import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Customer } from '../profile/models/Customer';
import { ChangePassword } from '../profile/models/ChangePassword';

@Injectable({
  providedIn: 'root'
})
export class ClientsApiService {

  basePath = 'http://localhost:8105/api/v1/admin/clientes';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) {
  }

  handleError(error: HttpErrorResponse) {

    let errorMessage = 'Something happened with request, please try again later';

    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );

          // Si el backend envía un mensaje específico
      if (error.error && error.error.message) {
        errorMessage = error.error.message; // Captura el mensaje personalizado
      } else if (typeof error.error === 'string') {
        errorMessage = error.error; // Captura el mensaje de error si es un string
      }
    }
    return throwError(errorMessage);
  }

  getClientById(id: number){
    return this.http.get<Customer>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // createService(service: ServiceReservationAdd) {
  //   return this.http.post<ServiceReservation>(this.basePath, service, this.httpOptions)
  //     .pipe(
  //       catchError(this.handleError) // Manejo de errores
  //     );
  // }

  updateClient(id:number, cliente: Customer) {
    return this.http.put<Customer>(`${this.basePath}/${id}`, cliente, this.httpOptions)
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  updatePassword(id:number, ChangePassword: ChangePassword) {
    return this.http.put<Customer>(`${this.basePath}/${id}/change-password`, ChangePassword, this.httpOptions)
    .pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

}
