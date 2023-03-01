import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Storage } from '@ionic/storage';

export interface user {
  id?: string;
  Email: string;
  Password: string;
}
@Injectable({
  providedIn: 'root'
})

export class UserService {

  private UserCollection: AngularFirestoreCollection<user>;
  public User:user[] = [];

  constructor(private  afs:  AngularFirestore,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private store: Storage,
    private afAuth: AngularFireAuth) { 
      this.UserCollection  =  this.afs.collection<user>('users');
    }

    loginUser(newEmail: string, newPassword: string): Promise<any> {
      return this.afAuth.signInWithEmailAndPassword(newEmail, newPassword);
    }
    resetPassword(email: string): Promise<void> {
      return this.afAuth.sendPasswordResetEmail(email);
    }
    logoutUser(): Promise<void> {
      return this.afAuth.signOut();
    }
    signupUser(newEmail: string, newPassword: string): Promise<any> {
      return this.afAuth.createUserWithEmailAndPassword(newEmail, newPassword);
    }
      
   
  
  
}
