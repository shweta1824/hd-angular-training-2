import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MyBlogListComponent } from './Components/my-blog-list/my-blog-list.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { BlogComponent } from './Components/blog/blog.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'my-blogs', component: MyBlogListComponent },
  { path: 'blog', component: BlogComponent},
  // { path: 'blog-form', component: BlogFormComponent },
  { path: 'blog/:id', component: BlogComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
