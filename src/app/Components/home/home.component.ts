import { Component, OnInit } from '@angular/core';
import { BlogServiceService, BlogPost, BlogPostWithUsername } from 'src/app/Services/blog-service.service';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { combineLatest, from, of } from 'rxjs';
import { AuthService, User } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  blogs: BlogPost[] = [];
  users: User[] = [];
  author: string = '';
  result: any[] = [];

  constructor(private blogService: BlogServiceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.blogService.getAll().snapshotChanges().pipe(
      map((blogs: any) => {
        return blogs.map((blog: any) => {
          return {
            id: blog.payload.doc.id,
            ...blog.payload.doc.data()
          }
        })
      }),
      switchMap((blogs: BlogPost[]) => {
        const blogObservables = blogs.map((blog: BlogPost) => {
          if (blog.author) {
            return this.authService.getUserByIdAsObservable(blog.author).pipe(
              map((user: User | null) => {
                return {
                  ...blog,
                  username: user ? user.userName : 'Unknown'
                };
              }),
            );
          } else {
            return of({ ...blog, username: 'Unknown' });
          }
        });
        return combineLatest(blogObservables);
      })
    ).subscribe((blogs: BlogPostWithUsername[]) => {
      this.blogs = blogs;
      console.log(this.blogs)
    });
  }
}
