import { Component, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { RegisterCustomer } from '../../models/RegisterCustomer';
import { Router } from '@angular/router';

interface Rol {
  value: string
}
interface Nationality {
  country: string
}

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [provideNativeDateAdapter(),{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' },],
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, 
    MatIconModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  hide = signal(true);
  form!: FormGroup;
  registerSub!: Subscription
  errorMessage: string = ''


  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  roles: Rol[] = [
    {value: 'ADMIN'},
    {value: 'USER'}
  ]

  nationalities: Nationality[] = [
    {country: 'Peru'},
    {country: 'Argentina'},
    {country: 'Bolivia'},
    {country: 'Brasil'},
    {country: 'Canada'},
    {country: 'Chile'},
    {country: 'Colombia'},
    {country: 'Ecuador'},
    {country: 'Estados unidos'},
    {country: 'Mexico'}
  ]

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Crear el formulario con validaciones
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      apellido: ['', Validators.required],
      dni_ce: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      telefono: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      fecha_de_nacimiento: ['', Validators.required]
    });
  }

  register(): void {
    if(this.registerSub)
      this.registerSub.unsubscribe()

    const registerCustomer:RegisterCustomer = {
      dni_ce: this.form.get('dni_ce')?.value,
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      nacionalidad: this.form.get('nacionalidad')?.value,
      telefono: this.form.get('telefono')?.value,
      fecha_de_nacimiento: this.form.get('fecha_de_nacimiento')?.value,
      role: this.form.get('role')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }

    this.registerSub = this.authService.register(registerCustomer).subscribe({
      next: (result) => {
        this.authService._setSession(result)
        this.errorMessage = ''
        this.router.navigate(['/rooms'])
      },
      error: (error: string) => {
        this.errorMessage = error;
      }
    })
  }

  ngOnDestroy(): void {
    if(this.registerSub)
      this.registerSub.unsubscribe()
  }

}
