import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

  title = "Rolling";

  constructor(private auth: AuthService) {
    if(localStorage.getItem('bangular-jwt-refresh-token') !== null) {
      this.auth.isLoggedIn = true;
      this.auth.username = localStorage.getItem('username');
    }
  }

}
