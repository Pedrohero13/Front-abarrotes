import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Auth } from 'src/app/model/auth';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  token: any
  auth: Auth={
    contrasena:"",
    email:"",
  }
  constructor(private service: AuthService, private router: Router){

  }

 

  async onSubmit() {
    const response = this.service.login(this.auth)
    this.token = await lastValueFrom(response)
    localStorage.setItem('token',this.token.access_token)
    this.router.navigate(["/","home"])

  }
}
