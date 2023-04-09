import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private UserCollection: AngularFirestoreCollection<any>;
  public User:any[] = [];

  constructor(private  afs:  AngularFirestore,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private store: Storage,
    private afAuth: AngularFireAuth) { 
      this.UserCollection  =  this.afs.collection<any>('users');
    }

    loginUser(newEmail: string, newPassword: string): Promise<any> {
      console.log("hi");
      return this.afAuth.signInWithEmailAndPassword(newEmail, newPassword).catch((res)=> console.log('hi'));
    }
    resetPassword(email: string): Promise<void> {
      return this.afAuth.sendPasswordResetEmail(email);
    }
    logoutUser(): Promise<void> {
      return this.afAuth.signOut();
    }
    signupUser(newEmail: string, newPassword: string,user:any): Promise<any> {
      console.log("hi");
      return this.afAuth.createUserWithEmailAndPassword(newEmail, newPassword).catch((res)=> console.log('hi'));
    }

    adduser(newEmail: string, newPassword: string,user:any){
      
        this.signupUser(newEmail,newPassword,user).then((resolvedValue)=>{

              const userId = resolvedValue.userId;
              this.afs.collection('Users').doc(userId).set({type: user})
              console.log('done')

         }).catch(()=> console.log('erroe') )
  }
      
   
  
  
}
