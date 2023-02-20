import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';


export interface car {
  id?: string;
  Price:number;
  Brand: string;
  Model: string;
  Year: number;
  KM: number;
  New: boolean;
  Disc:string;
  date:Date;
  Sold_date:Date;
  Sold:boolean;
  accept:boolean;
  index:number;
  Showrooms_id?:string;
  User_id?:string;
  Tell?:string;
  WhatsApp?:string;
  Image_index:number;
}
@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private CarCollection: AngularFirestoreCollection<car>;
  public Cars:car[] = [];
  public brand:any[]=[];

  public loading:boolean=false;
  fav_ID: any[]= [];
  detail_ID:any;

  constructor(private  afs:  AngularFirestore,
              private db: AngularFireDatabase,
              private storage: AngularFireStorage,
              private store: Storage
              )
  { 
    this.CarCollection  =  this.afs.collection<car>('cars');
    this.getbrand().then((res)=> this.brand=res)
  }


  // start localStorage part

  Save_fav_ID(id:any){
    this.fav_ID = this.fav_ID || [];
    if(!this.fav_ID.includes(id)){
      
      this.fav_ID.push(id);
      console.log(this.fav_ID);
      this.store.set('fav_ID', this.fav_ID );
    }

    
  }

  save_unlike(){
    this.fav_ID = this.fav_ID || [];
    this.store.set('fav_ID', this.fav_ID );
  }

  Get_fav_ID(){
    this.store.get('fav_ID').then( val => { 
      if(val)
      this.fav_ID = val;
      
    });
  }



  // end localStorage part
  
  



  async addCar(Car: car, images: any[]): Promise<any> {
    return this.CarCollection.add(Car)
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
      const filePath = 'cars/';
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
      return this.CarCollection.ref.orderBy('index').limit(5).get().then(collection => {
        return   collection.docs.map(doc =>{
          let a = {id: doc.id ,...doc.data()}
          return a
        } 
        );
      });
    }

    getNextFirst10Rows(index:any) {
      return this.CarCollection.ref.orderBy('index').limit(5).startAfter(index).get().then(collection => {
        return   collection.docs.map(doc =>{
          let a = {id: doc.id ,...doc.data()}
          return a
        } 
        );
      });
    }

    getbrand() {
      return this.afs.collection<any>('brand').ref.get().then(collection => {
        return   collection.docs.map(doc =>{
          let a = {id: doc.id ,...doc.data()}
          return a
        } 
        );
      });
    }


   

   


  // updateCarIamge(Car_id:string,photos_url: string[]): Promise<void> {
  //         return this.CarCollection.doc(Car_id).update({ photos_url: photos_url });
  //   }
      
    
}
