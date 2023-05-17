import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { log } from 'console';
import { finalize } from 'rxjs/operators';
import { UserService } from './user.service';

export interface Showroom {
  id?: string;
  Name: string;
  Email: string;
  City: string;
  Insta: string;
  Location: string;
  Tell: number;
  WhatsApp : number;
  date:Date;
  hours:string[];
}
@Injectable({
  providedIn: 'root'
})
export class ShowroomService {

  private showroomCollection: AngularFirestoreCollection<Showroom>;
  public Cars:Showroom[] = [];
  public loading:boolean=false;


  constructor(private  afs:  AngularFirestore, private db: AngularFireDatabase, private storage: AngularFireStorage,private UserSrv:UserService) { 
    this.showroomCollection  =  this.afs.collection<Showroom>('Users');
  }



  async addShowroom(Showroom: any, img: any): Promise<any> {
    let password=Showroom.Password;
    delete Showroom['Password'];
    console.log(Showroom);
    console.log(password);
    console.log(img);
    this.UserSrv.addshowroom(Showroom.Email,password).then((res:any)=>{
      const userId = res.user?.uid;
      return this.afs.collection('Users').doc(userId).set({...Showroom,'type':"showroom"})
      .then(async (docRef) => {
        await this.uploadFile(userId, img[0]);
        this.loading=false;
      });
    })
   
  }

    async uploadFile(id: any, image: any) {
      const filePath = 'showrooms/';
      const ref = this.storage.ref(filePath + id);
      const task = ref.put(image);
      return new Promise<void>((resolve, reject) => {
        task.snapshotChanges().pipe(
          finalize(async () => {
            const url = await ref.getDownloadURL().toPromise();
            console.log(url);
            this.db.object(filePath).set({ url });
            resolve();
          })
        ).subscribe(null, reject);
      });
    }



    getFirst10Rows(){
      return this.showroomCollection.ref.where('type','==','showroom').get().then(collection => {
        return   collection.docs.map(doc =>{
          let a = {id: doc.id ,...doc.data()}
          return a
        } 
        );
      });
    }
 
    async getShowroomById(showroomId: string) {
      const docRef = this.showroomCollection.ref.doc(showroomId);
      const doc = await docRef.get();
    
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      } else {
        throw new Error("Showroom not found");
      }
    }


}
