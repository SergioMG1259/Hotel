import { Component, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

interface Rol {
  value: string
}
interface Nationality {
  country: string
}

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, 
    MatIconModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  hide = signal(true);
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  roles: Rol[] = [
    {value: 'Admin'},
    {value: 'User'}
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

}
