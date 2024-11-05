import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn = false;
  private _userRole: string | null = 'admin';

  constructor() { }

  login(role: string): void {
    this._isLoggedIn = true;
    this._userRole = role;
  }

  get userRol() {return this._userRole}
  get isLoggedIn() {return this._isLoggedIn}
}
