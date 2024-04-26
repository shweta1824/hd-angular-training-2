import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'blog';

  isLoggedIn$: Observable<boolean> | undefined; 

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
    }

  logout() {
    this.authService.logout();
  }
}
