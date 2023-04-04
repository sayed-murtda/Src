import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
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
  private CarBrands: AngularFirestoreCollection<any>;

  public loading:boolean=false;
  fav_ID: any[]= [];
  detail_ID:any;

  constructor(private  afs:  AngularFirestore,
              private db: AngularFireDatabase,
              private storage: AngularFireStorage,
              private store: Storage
              )
  {
    this.CarBrands  =  this.afs.collection<any>('brand');
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


    Hyundai = 'Hyundai';
    model = 'Sonata';

    getFirst10Rows() {
      return this.CarCollection.ref.limit(5).get().then(collection => {
        return   collection.docs.map(doc =>{
          let a = {id: doc.id ,...doc.data()}
          return a
        } 
        );
      });
    }

    filter_Brand_Price_NewOld() {
      return this.CarCollection.ref.where("Brand" ,"==", this.filter_brand)
                                   .where("Price" ,">=", this.filter_first_price)
                                   .where("Price" ,"<=", this.filter_last_price)
                                   .where("New" ,"==", this.filter_new_or_old)
                                   .get().then(collection => {
        return   collection.docs.map(doc =>{
          let a = {id: doc.id ,...doc.data()}
          return a
        } 
        );
      });
    }

    filter_Price_NewOld() {
      return this.CarCollection.ref.where("Price" ,">=", this.filter_first_price)
                                   .where("Price" ,"<=", this.filter_last_price)
                                   .where("New" ,"==", this.filter_new_or_old)
                                   .get().then(collection => {
        return   collection.docs.map(doc =>{
          let a = {id: doc.id ,...doc.data()}
          return a
        } 
        );
      });
    }

    filter_Brand_Price() {
      return this.CarCollection.ref.where("Brand" ,"==", this.filter_brand)
                                   .where("Price" ,">=", this.filter_first_price)
                                   .where("Price" ,"<=", this.filter_last_price)
                                   .get().then(collection => {
        return   collection.docs.map(doc =>{
          let a = {id: doc.id ,...doc.data()}
          return a
        } 
        );
      });
    }

    filter_everything() {
      return this.CarCollection.ref.where("Price" ,">=", this.filter_first_price)
                                   .where("Price" ,"<=", this.filter_last_price)
                                   .get().then(collection => {
        return   collection.docs.map(doc =>{
          let a = {id: doc.id ,...doc.data()}
          return a
        } 
        );
      });
    }

    filter_first_price = 0; // alwayes search
    filter_last_price = 9999999; // alwayes search
    filter_first_year = 0;
    filter_last_year= 2100;
    filter_brand: any;
    filter_model: any;
    filter_new_or_old: any;

    filter: any[] = []; 
    key = false;

   filter_cars(first_year?:any,last_year?:any,start_price?:any, end_price?:any, New?:any, Old?:any, brand?:any, model?:any) {
      
      this.filter= []; 

      var check_first_y = false; // to know if we searched about last year
      var check_last_y = false; // to know if we searched about first year
      var new_check = false; 
      var old_check = false;
      var model_check = false;


      if(first_year){
        this.filter_first_year = first_year;
        check_first_y = true;
        
      }

      if(last_year){
        this.filter_last_year = last_year;
        check_last_y = true;
        
      }
         
      if(start_price) // alwayes search
      this.filter_first_price = start_price;

      if(end_price) // alwayes search
      this.filter_last_price = end_price;

      if(New && Old){ // no need to make filter to them
        New = null;
        Old = null;
      }

      if(New){
        this.filter_new_or_old = 'New';
        new_check = true;
      }
      
      if(Old){
        this.filter_new_or_old = 'Used';
        old_check = true;
      }

      if(brand)
      this.filter_brand = brand;

      if(model){
        this.filter_model = model;
        model_check = true;
      }
      

      // ------------------------------------------------------

      if(brand && (New || Old) ){ // brand , price , new or old
        this.filter_Brand_Price_NewOld().then((res)=>{
          if(res){
          this.filter=res;

          //----------------
          if(first_year){
            this.filter = this.filter.filter((new_Filter)=> new_Filter.Year >= first_year)
          }
          if(last_year){
            this.filter = this.filter.filter((new_Filter)=> new_Filter.Year <= first_year)
          }
          if(model){
            for(var i=0; i<model.length; i++){
              this.filter = this.filter.filter((new_Filter)=> new_Filter.Model == model[i])
            }      
          }

          //----------------

          console.log(this.filter);   
          }
        });


      } 
      else if(brand){ // brand , price
        this.filter_Brand_Price().then((res)=>{
          if(res){
          this.filter=res;

          //----------------
          if(first_year){
            this.filter = this.filter.filter((new_Filter)=> new_Filter.Year >= first_year)
          }
          if(last_year){
            this.filter = this.filter.filter((new_Filter)=> new_Filter.Year <= first_year)
          }
          if(model){
            for(var i=0; i<model.length; i++){
              this.filter = this.filter.filter((new_Filter)=> new_Filter.Model == model[i])
            }      
          }
          if(New){
            this.filter = this.filter.filter((new_Filter)=> new_Filter.New == 'New')
          }
          if(Old){
            this.filter = this.filter.filter((new_Filter)=> new_Filter.New == 'Used')
          }

          //----------------
   
          console.log(this.filter);
          }
        });


      }
      else if(New || Old){ // price , new or old
        this.filter_Price_NewOld().then((res)=>{
          if(res){
          this.filter=res;

          //----------------
          if(first_year){
            this.filter = this.filter.filter((new_Filter)=> new_Filter.Year >= first_year)
          }
          if(last_year){
            this.filter = this.filter.filter((new_Filter)=> new_Filter.Year <= first_year)
          }
          if(brand){
            this.filter = this.filter.filter((new_Filter)=> new_Filter.brand == brand)
          }
          if(model){
            for(var i=0; i<model.length; i++){
              this.filter = this.filter.filter((new_Filter)=> new_Filter.Model == model[i])
            }      
          }

          //----------------
          console.log(this.filter);
          }
        });
      }
      else{ // price
        this.filter_everything().then((res)=>{
          if(res){
          this.filter=res;

            if(first_year){
              this.filter = this.filter.filter((new_Filter)=> new_Filter.Year >= first_year)
            }
            if(last_year){
              this.filter = this.filter.filter((new_Filter)=> new_Filter.Year <= first_year)
            }
            if(brand){
              this.filter = this.filter.filter((new_Filter)=> new_Filter.brand == brand)
            }
            if(model){
              for(var i=0; i<model.length; i++){
                this.filter = this.filter.filter((new_Filter)=> new_Filter.Model == model[i])
              }      
            }
            if(New){
              this.filter = this.filter.filter((new_Filter)=> new_Filter.New == 'New')
            }
            if(Old){
              this.filter = this.filter.filter((new_Filter)=> new_Filter.New == 'Used')
            }

            console.log(this.filter);
          }
        });     
      }

      

    }// end of filter function



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


    updateCars(id: any ,Cars:any) {
      return  this.CarBrands.doc(id).set(Cars);
    }

      


   

   


  // updateCarIamge(Car_id:string,photos_url: string[]): Promise<void> {
  //         return this.CarCollection.doc(Car_id).update({ photos_url: photos_url });
  //   }




      
    
}
