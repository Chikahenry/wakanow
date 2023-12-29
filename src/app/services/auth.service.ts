import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  // Sign up method
  signUp(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Sign in method
  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Sign out method
  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
}