import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

export interface car {
  id?: string;
  Brand: string;
  Model: string;
  price:number;
  Year: number;
  KM: number;
  New: boolean;
  Disc:string;

  date:Date;
  Sold_date:Date;
  Sold:boolean;
  accept:boolean;

  Showrooms_id?:string;
  User_id?:string;
  phone?:string;
  whatsApp?:string;
  photos_url?:string[]
}
@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private CarCollection: AngularFirestoreCollection<car>;
  public Cars:car[] = [];


  constructor(private  afs:  AngularFirestore) { 
    this.CarCollection  =  this.afs.collection<car>('cars');
  }

  addCar(Car: car): Promise<any> {
          return this.CarCollection.add(Car).then((docRef )=>{
            console.log(docRef);
          });     
    }

  updateCarIamge(Car_id:string,photos_url: string[]): Promise<void> {
          return this.CarCollection.doc(Car_id).update({ photos_url: photos_url });
    }
      
    
}
