import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  email: string = '';
  name: string = '';

  constructor(private authService: AuthService) { }

  async ngOnInit() {
   await this.authService.getUserEmail().then((res:any)=> {
    this.email = res.email
    this.name=res.name
    })
  }
}
