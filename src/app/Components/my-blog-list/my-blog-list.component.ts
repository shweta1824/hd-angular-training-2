import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { BlogPost, BlogServiceService } from 'src/app/Services/blog-service.service';

@Component({
  selector: 'app-my-blog-list',
  templateUrl: './my-blog-list.component.html',
  styleUrls: ['./my-blog-list.component.css']
})
export class MyBlogListComponent implements OnInit {
  myBlogPosts: BlogPost[] = [];
  userId: string = '';

  constructor(
    private blogService: BlogServiceService,
    private authService: AuthService
  ) { }


  async ngOnInit(): Promise<void> {
    (await this.authService.getAuthState()).subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.fetchMyBlogPosts();
      }
    });
  }

  fetchMyBlogPosts(): void {
    this.blogService
      .getByAuthor(this.userId)
      .snapshotChanges()
      .subscribe((blogs: any) => {
        this.myBlogPosts = blogs.map((blog: any) => {
          return {
            id: blog.payload.doc.id,
            ...blog.payload.doc.data(),
          };
        });
      });
  }
}
