import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
// import { BlogPost } from '../models/blogs-model';

export interface BlogPost {
  id?: string;
  title?: string;
  content?: string;
  author: string;
  status?: 'active' | 'inactive';
  createdAt?: firebase.default.firestore.Timestamp;
  username?: string;
}

// In your blog-service.service.ts file
export interface BlogPostWithUsername extends BlogPost {
  username: string;
}

@Injectable({
  providedIn: 'root'
})

export class BlogServiceService {
  private dbPath = '/blogs';

  blogsRef: AngularFirestoreCollection<BlogPost>;

  constructor(private db: AngularFirestore) {
    this.blogsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<BlogPost> {
    return this.blogsRef;
  }

  // get blog post by author
  getByAuthor(author: string): AngularFirestoreCollection<BlogPost> {
    return this.db.collection(this.dbPath, ref => ref.where('author', '==', author));
  }

  // get blog post by id
  getById(id: string): AngularFirestoreCollection<BlogPost> {
    return this.db.collection(this.dbPath, ref => ref.where('id', '==', id));
  }

  // create blog post
  create(blog: BlogPost): any {
    const id = this.db.createId();
    return this.blogsRef.add({ id, ...blog });
  }

  // update blog post
  update(id: string, data: any): Promise<void> {
    console.log(this.blogsRef.ref.doc(id))
    return this.blogsRef.doc(id).update(data)

  }
}
