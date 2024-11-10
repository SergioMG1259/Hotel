import { Component, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Login } from '../../models/Login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, 
    MatIconModule, CommonModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hide = signal(true)
  form: FormGroup

  loginSub!: Subscription
  errorMessage: string = ''

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login(): void {
    if(this.loginSub)
      this.loginSub.unsubscribe()

    const login:Login = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }

    this.loginSub = this.authService.login(login).subscribe({
      next: (result) => {
        this.authService._setSession(result)
        this.errorMessage = ''
        this.router.navigate(['/rooms'])
      },
      error: (error: string) => {
        // Asigna el mensaje de error a una variable para mostrarlo en el html
        this.errorMessage = error;
      }
    })

    // this.router.navigate(['/rooms']); // Redirigir a la página deseada después de iniciar sesión
  }

  ngOnDestroy(): void {
    if(this.loginSub)
      this.loginSub.unsubscribe()
  }

}
