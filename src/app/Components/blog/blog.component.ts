import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AuthService } from 'src/app/Services/auth.service';
import { BlogServiceService, BlogPost } from 'src/app/Services/blog-service.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogPost: BlogPost = {
    title: '',
    content: '',
    author: '',
    status: 'active',
    createdAt: firebase.firestore.Timestamp.now(),
  };
  editMode = false;

  constructor(private blogService: BlogServiceService, private authService: AuthService, private route: Router) { }

  async ngOnInit(): Promise<void> {
    (await this.authService.getAuthState()).subscribe((user: any) => {
      if (user) {
        this.blogPost.author = user.uid;
      }
    });

    const blogId = this.route.url.split('/')[2];
    if (blogId) {
      this.editMode = true;
      this.blogService.getById(blogId).snapshotChanges().subscribe((blogs: any) => {
        console.log(blogs[0].payload.doc.data());
        this.blogPost = {
          id: blogs[0].payload.doc.id,
          ...blogs[0].payload.doc.data()
        };
      });
    }

  }

  async saveBlog(): Promise<void> {
    if (this.editMode && this.blogPost.id) {
      console.log(this.blogPost);
      await this.blogService.update(this.blogPost.id, this.blogPost);

    } else {
      await this.blogService.create(this.blogPost);
    }
    this.route.navigate(['/']);
  }

}
