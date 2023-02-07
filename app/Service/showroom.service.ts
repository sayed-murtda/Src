import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

export interface car {
  id?: string;
  Name: string;
  Email: string;
  Password: string;
  City: string;
  Insta: string;
  Tell: number;
  WhatsApp : number;

  Showrooms_id?:string;
  User_id?:string;
  phone?:string;
  whatsApp?:string;
  photos_url?:string[]
}
@Injectable({
  providedIn: 'root'
})
export class ShowroomService {

  private CarCollection: AngularFirestoreCollection<car>;
  public Cars:car[] = [];


  constructor(private  afs:  AngularFirestore) { 
    this.CarCollection  =  this.afs.collection<car>('showrooms');
  }

  addCar(Car: car): Promise<any> {
          return this.CarCollection.add(Car).then((docRef:any)=>{
            console.log(docRef);
          });     
    }

  updateCarIamge(Car_id:string,photos_url: string[]): Promise<void> {
          return this.CarCollection.doc(Car_id).update({ photos_url: photos_url });
    }
}
