import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login_message: string;
  register_message: string;
  logout_message: string;
  closed = true;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  login(username, password) {
    this.auth.login(username, password)
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/']);
        } else {
          this.login_message = "Ουπς, λάθος όνομα χρήστη ή κωδικός πρόσβασης. Βεβαιώσου ότι είσαι εγγεγραμένος/η."
        }
    });
  }

  register(username, password) {
    this.auth.register(username, password)
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/']);
        } else {
          this.register_message = "Βεβαιώσου οτι ο κωδικός έχει τουλάχσιτον 8 χαρακτήρες και τουλάχιστον 1 μή αριθμητικό χαρακτήρα."
        }
    });
  }

  logout() {
    this.auth.logout();
    this.logout_message = "Αποσυνδέθηκες επιτυχώς."
    this.closed = false;
  }

}
