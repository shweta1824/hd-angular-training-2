import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

export interface User {
  id?: string;
  userName: string;
  email: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  getById(userId: string) {
    throw new Error('Method not implemented.');
  }
  private dbPath = '/users';

  usersRef: AngularFirestoreCollection<User>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
    this.usersRef = db.collection(this.dbPath);
  }

  private loggedIn = new BehaviorSubject<boolean>(false);
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // login method
  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('user', JSON.stringify(res.user));
      this.loggedIn.next(true);
      this.router.navigate(['/home']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  async register(email: string, password: string, username: string) {
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log(res, username);
      await res.user?.updateProfile({
        displayName: username
      });
      await this.usersRef.add({ userName: username, email: email, createdAt: Date.now(), id: res.user?.uid });
      localStorage.setItem('user', JSON.stringify(res.user));
      this.loggedIn.next(true);
      this.router.navigate(['/home']);
    } catch (err:any) {
      alert(err?.message);
      this.router.navigate(['/register']);
    }
  }

  // sign in with google
  googleSignIn() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(res => {
      this.router.navigate(['/home']);
      localStorage.setItem('user', JSON.stringify(res.user));
    }, err => {
      alert(err.message);
    })
  }

  async getUserEmail(): Promise<any> {
    const user = await this.afAuth.currentUser;
    console.log(user)
    return {
        email:user?.email,
        name:user?.displayName,

    };

  }

  async getUserById(id: string): Promise<AngularFirestoreCollection<User>> {
    return this.db.collection(this.dbPath, ref => ref.where('id', '==', id));
  }

  getUserByIdAsObservable(id: string): Observable<User | null> {
    return this.db.collection<User>(this.dbPath, ref => ref.where('id', '==', id))
      .valueChanges({ idField: 'id' })
      .pipe(
        map(users => users.length > 0 ? users[0] : null)
      );
  }

  // logout method
  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  async getAuthState(): Promise<Observable<any>> {
    return this.afAuth.authState;
  }

}
