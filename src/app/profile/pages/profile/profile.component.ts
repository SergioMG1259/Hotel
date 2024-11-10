import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { ClientsApiService } from '../../../services/clients-api.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChangePassword } from '../../models/ChangePassword';
import { AuthService } from '../../../auth/services/auth.service';
import { Customer } from '../../models/Customer';

interface Nationality {
  country: string
}

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [provideNativeDateAdapter(),{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' },],
  imports: [CommonModule, FormsModule ,MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, 
    MatIconModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, MatTabsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  customer: Customer = {
    nombre: '',
    apellido: '',
    dni_ce: '',
    fecha_de_nacimiento: new Date(),
    nacionalidad: '',
    email: '',
    telefono: ''
  }
  customerCopy!: Customer

  password: string = ''
  newPassword: string = ''
  errorMessage: string = ''
  passwordChanged: boolean = false

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

  hidePassword = signal(true);
  hideNewPassword = signal(true);

  getClientSub!: Subscription
  editClientSub!: Subscription
  changePasswordSub!: Subscription

  constructor(private clientService: ClientsApiService, private authService: AuthService) {

  }
  
  clickEventPassword(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  clickEventNewPassword(event: MouseEvent) {
    this.hideNewPassword.set(!this.hideNewPassword());
    event.stopPropagation();
  }

  // Función para verificar si hay cambios
  hasChanges(): boolean {
    return JSON.stringify(this.customer) == JSON.stringify(this.customerCopy);
  }

  editClient() {
    if(this.editClientSub)
      this.editClientSub.unsubscribe()

    this.editClientSub = this.clientService.updateClient(this.authService.customerId!, this.customer).subscribe(result => {
      this.customerCopy = result
      this.customerCopy.fecha_de_nacimiento = this.customer.fecha_de_nacimiento
    })
  }

  changePassword() {
    if(this.changePasswordSub)
      this.changePasswordSub.unsubscribe()

    const changePassword:ChangePassword = {
      password : this.password,
      newPassword : this.newPassword
    }

    this.changePasswordSub = this.clientService.updatePassword(this.authService.customerId!, changePassword).subscribe({
      next: (result) => {
        this.passwordChanged = true
        this.password = ''
        this.newPassword = ''
        this.errorMessage = ''
      },
      error: (error: string) => {
        // Asigna el mensaje de error a una variable para mostrarlo en el html
        this.errorMessage = error;
      }
    })
  }

  ngOnInit(): void {
    this.getClientSub = this.clientService.getClientById(this.authService.customerId!).subscribe(result => {
      this.customer = result
      this.customerCopy = { ...result }
    })
  }

  ngOnDestroy(): void {
    if(this.getClientSub)
      this.getClientSub.unsubscribe()

    if(this.editClientSub)
      this.editClientSub.unsubscribe()

    if(this.changePasswordSub)
      this.changePasswordSub.unsubscribe()
  }
}
