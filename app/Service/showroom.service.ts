import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

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


  constructor(private  afs:  AngularFirestore, private db: AngularFireDatabase, private storage: AngularFireStorage) { 
    this.showroomCollection  =  this.afs.collection<Showroom>('showrooms');
  }



  async addShowroom(Showroom: Showroom, images: any[]): Promise<any> {
    return this.showroomCollection.add(Showroom)
      .then(async (docRef) => {
        let i = 1;
        for (const img of images) {
          await this.uploadFile(docRef.id + i, img);
          i++;
        }
        this.loading=false;
      });
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



    getFirst10Rows() {
      return this.showroomCollection.ref.orderBy('date').startAt(1).limit(3).get().then(collection => {
        return   collection.docs.map(doc =>{
          let a = {id: doc.id ,...doc.data()}
          return a
        } 
        );
      });
    }


}
