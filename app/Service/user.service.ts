import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Storage } from '@ionic/storage-angular';
import { LanguageService } from '../language.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private UserCollection: AngularFirestoreCollection<any>;
  public User:any = {
    name:'',
    email:'',
    gender:'',
    phone:'',
  };

  constructor(private  afs:  AngularFirestore,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private store: Storage,
    private afAuth: AngularFireAuth,
    public langSrv:LanguageService,
    private navCtrl: NavController,
    public route: Router) { 
      this.UserCollection  =  this.afs.collection<any>('Users');

      this.afAuth.authState.subscribe(user => {
        if (user) {
          console.log("yes  id:"+ user.uid);
        }else
        console.log('not log in');
        
      });

    }

    loginUser(newEmail: string, newPassword: string): Promise<any> {
      return this.afAuth.signInWithEmailAndPassword(newEmail, newPassword).then((res)=>{
        const userId = res.user;
        this.langSrv.signin=true;
        let id:any="";
         id = userId?.uid;
         this.getuser(id).subscribe((res)=>{
          this.User=res.data();
          this.langSrv.setUser({id:id,...this.User});
          this.route.navigateByUrl('/tabs/profile')
         });
      }).catch((res)=> console.log('hwi'));
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
      
      this.afAuth.createUserWithEmailAndPassword(newEmail,newPassword).then((resolvedValue)=>{
          
              const userId = resolvedValue.user?.uid;
              this.afs.collection('Users').doc(userId).set({...user})
              this.User=user;
              this.langSrv.setUser({id:userId,...user});
              this.navCtrl.navigateBack("/tabs/profile");     
         }).catch(()=> console.log('erroe') )
  }

  isSingin():boolean{
     if(this.langSrv.signin){
        if(this.User.email=='')
      this.User=this.langSrv.user;
      return true;
     }else
     return false;
  }

  out(){
    this.langSrv.out();
    this.afAuth.signOut();
  }

  
  getUserById(id:string){
    return  this.UserCollection.doc(id).get();
  }

  getuser(id:any){
    return this.UserCollection
     .doc(id)
     .get()
     }
      
   
  
  
}
