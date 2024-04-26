import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string = '';
  password: string = '';
  username: string = '';

  constructor(private auth: AuthService) { }

  register() {

    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    if (this.username == '') {
      alert('Please enter username');
      return;
    }

    this.auth.register(this.email, this.password, this.username); 

    this.email = '';
    this.password = '';

  }
  signInWithGoogle() {
    this.auth.googleSignIn();
  }
}
