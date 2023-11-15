import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/User';
import { ApiService } from 'src/app/services/auth-services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  creds:Credentials = {
    username: '',
    password: '',
    role: ''
  };

  constructor(
    private apiService: ApiService,
    private router: Router
    ) {

     }
  login(form: NgForm){
    console.log ('form value', form.value);

    this.apiService.login(this.creds)
    .subscribe(response => {
      this.router.navigate(['/list']);

    })
  }
}
