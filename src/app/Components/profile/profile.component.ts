import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  email: string = '';

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    this.email = await this.authService.getUserEmail();
  }
}
