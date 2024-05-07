import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: string = '';
  name: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Check if user is authenticated
    if (this.authService.isAuthenticated()) {
      // Retrieve user email and name
      const storedEmail = localStorage.getItem('userEmail');
      const storedName = localStorage.getItem('userName');

      if (storedEmail && storedName) {
        this.email = storedEmail;
        this.name = storedName;
      } else {
        // Fetch user details if not stored in local storage
        this.authService.getUserEmail().subscribe(
          (res: any) => {
            this.email = res.email;
            this.name = res.name;
            // Store user data in local storage
            localStorage.setItem('userEmail', this.email);
            localStorage.setItem('userName', this.name);
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );
      }
    } else {
      console.error('User not authenticated');
    }
  }
}
