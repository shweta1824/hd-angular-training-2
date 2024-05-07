import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import axios from 'axios';
import { Observable } from 'rxjs';

export interface BlogPost {
  id?: string;
  title?: string;
  content?: string;
  author: string;
  status?: 'active' | 'inactive';
  createdAt?: firebase.default.firestore.Timestamp;
  username?: string;
  image?: string;
}

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
    this.blogsRef = db.collection<BlogPost>(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<BlogPost> {
    return this.blogsRef;
  }

  getByAuthor(author: string): AngularFirestoreCollection<BlogPost> {
    return this.db.collection<BlogPost>(this.dbPath, ref => ref.where('author', '==', author));
  }

  getById(id: string): AngularFirestoreCollection<BlogPost> {
    return this.db.collection(this.dbPath, ref => ref.where('id', '==', id));
  }

  async create(blog: BlogPost): Promise<any> {
    const id = this.db.createId();
    const imageUrl = await this.getRandomImage(); // Wait for image URL
    return this.blogsRef.doc(id).set({ id, ...blog, image: imageUrl });
  }

  async update(id: string, data: any): Promise<void> {
    return this.blogsRef.doc(id).update(data);
  }

  async getRandomImage(): Promise<string> {
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random?client_id=H4fjvQmAOixHkijBsmzdDrDXuZRm_4J65UPHzbD6RU8');
      return response.data?.urls?.raw || ''; // Return image URL
    } catch (error) {
      console.error('Error fetching random image:', error);
      return ''; // Return empty string if fetching fails
    }
  }
}
