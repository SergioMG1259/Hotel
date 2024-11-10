import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Auth } from '../models/Auth';
import { Login } from '../models/Login';
import { RegisterCustomer } from '../models/RegisterCustomer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basePath = 'http://localhost:8105/api/v1/auth';

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


  // private _isLoggedIn = false
  // private _userRole!: string


  // login(role: string): void {
  //   this._isLoggedIn = true;
  //   this._userRole = role;
  // }

  login(login: Login){
    return this.http.post<Auth>(`${this.basePath}/login`, login, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  register(registerCustomer: RegisterCustomer) {
    return this.http.post<Auth>(`${this.basePath}`, registerCustomer, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  public _setSession(auth: Auth) {
    sessionStorage.setItem('customerId', auth.id.toString());
    sessionStorage.setItem('customerRole', auth.role);
    sessionStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    sessionStorage.removeItem('customerId');
    sessionStorage.removeItem('customerRole');
    sessionStorage.removeItem('isLoggedIn');
  }

  get customerId(): number | null {
    const id = sessionStorage.getItem('customerId');
    return id ? Number(id) : null;
  }

  get customerRole(): string | null {
    return sessionStorage.getItem('customerRole');
  }

  get isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  // get userRol() {return this._userRole}
  // get isLoggedIn() {return this._isLoggedIn}

  // set userRol(role:string){this._userRole = role}
}
