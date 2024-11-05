import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Room } from '../rooms/models/Room';
import { AddRoom } from '../rooms/models/AddRoom';

@Injectable({
  providedIn: 'root'
})
export class RoomsApiService {

  basePath = 'http://localhost:8105/api/v1/admin/habitaciones';

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

  getAllRooms(){
    return this.http.get<Room[]>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getFilteredRooms(capacity: number | null, status: string | null, type: string | null, minPrice: number | null, maxPrice: number | null) {
    let params = new HttpParams();
    
    // Solo agregar parámetros si no son nulos o indefinidos
    if (capacity !== null) {
      params = params.append('capacidad', capacity.toString());
    }
    if (status) {
      params = params.append('estado', status);
    }
    if (type) {
      params = params.append('tipo', type);
    }
    if (minPrice !== null) {
      params = params.append('precioMinimo', minPrice.toString());
    }
    if (maxPrice !== null) {
      params = params.append('precioMaximo', maxPrice.toString());
    }

    return this.http.get<Room[]>(`${this.basePath}/filter`, { params, ...this.httpOptions })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  createRoom(room: AddRoom) {
    return this.http.post<Room>(this.basePath, room, this.httpOptions)
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  updateRoom(id:number, habitacion: Room) {
    return this.http.put<Room>(`${this.basePath}/${id}`, habitacion, this.httpOptions)
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  deleteRoom(id: number) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
