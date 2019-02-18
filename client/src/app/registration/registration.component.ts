import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';

import { User } from '../user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  register_message: string;


  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  register(username, password, rePassword) {
    let flag = true;
    if(password !== rePassword){
      this.register_message = "Οι κωδικοί πρόσβασης δεν ταιριάζουν.";
      flag = false;
    } else if(password.length < 8) {
      this.register_message = "Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες.";
      flag = false;
    } else if(/^\d+$/.test(password)) {
      this.register_message = "Ο κωδικός δε πρέπει να περιέχει μόνο αριθμητικά σύμβολα.";
      flag = false;
    } else {
      this.register_message = "Το όνομα χρήστη ήδη χρησιμοποείται, δοκιμάστε κάποιο άλλο.";
    }

    if(flag) {
      this.userService.addUser({username, password} as User)
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/login']);
        } else {
          this.register_message = "Το όνομα χρήστη ήδη χρησιμοποείται, δοκιμάστε κάποιο άλλο."
        }
    });
    }
  }
}
