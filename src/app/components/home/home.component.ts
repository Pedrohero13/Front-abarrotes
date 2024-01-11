import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user:any;

  constructor(private service: AuthService){

  }

  async ngOnInit(){
    const response = this.service.getme();
    const user = await lastValueFrom(response);
    this.user= user;
    console.log(user)
  }
}
