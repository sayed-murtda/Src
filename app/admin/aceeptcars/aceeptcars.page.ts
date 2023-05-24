import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CarsService } from '../../Service/cars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aceeptcars',
  templateUrl: './aceeptcars.page.html',
  styleUrls: ['./aceeptcars.page.scss'],
})
export class AceeptcarsPage implements OnInit {
  Cars:any[]=[];
  constructor(private navCtrl: NavController,private CarsSrv:CarsService,public router:Router,private alertController: AlertController) { 
    CarsSrv.getallcarsnotaccept().then((res)=>{
      if(res){
      this.Cars=res;
      console.log(this.Cars);

      }
    });
  }

  ngOnInit() {
  }

  back(){
    this.navCtrl.back();
  }

  go(id:any){
    this.CarsSrv.detail_cars=[];
    this.CarsSrv.detail_cars_display = [];
    this.CarsSrv.detail_ID = id;
    console.log(this.CarsSrv.detail_ID);

    this.CarsSrv.get_detail_cars().then((res)=>{
      if(res){

        this.CarsSrv.detail_cars = res;
        console.log(this.CarsSrv.detail_cars);

        this.CarsSrv.detail_cars.forEach(car => {
          if(this.CarsSrv.detail_ID.id != car.id) {
            this.CarsSrv.detail_cars_display.push(car);
          }  
        });
      }
    });
    this.router.navigateByUrl('/view-detail')
  }

  send(CAR:any){
    
  }

  CANCEL(car:any){
    this.CarsSrv.deleteWaitingCars(car.id).then(()=>{
     this.CarsSrv.addfinshcar(car).then(()=> {
      this.CarsSrv.getallcarsnotaccept().then((res)=>{
        if(res){
        this.Cars=res;
        console.log(this.Cars);
  
        }
      });
   
     });
    })
   }
 
   sold(car:any){
     this.CarsSrv.deleteWaitingCars(car.id).then(()=>{
       this.CarsSrv.addAccept(car).then(()=> {
        this.CarsSrv.getallcarsnotaccept().then((res)=>{
          if(res){
          this.Cars=res;
          console.log(this.Cars);
    
          }
        });
       });
      })
   }
 
   async presentAlert(car:any) {
     const alert = await this.alertController.create({
       header: 'Are you sure to Delete ?',
       cssClass: 'custom-alert',
       buttons: [
         {
           text: 'No',
           cssClass: 'alert-button-cancel',
           
         },
         {
           text: 'Delete',
           cssClass: 'alert-button-confirm',
           handler:  () => {
             this.CANCEL(car);
           },
         },
       ],
     });
 
     await alert.present();
   }
 
   async presentAlertSold(car:any) {
     const alert = await this.alertController.create({
       header: 'Are you sure to approval ?',
       cssClass: 'custom-alert',
       buttons: [
         {
           text: 'No',
           cssClass: 'alert-button-cancel',
           
         },
         {
           text: 'Yes',
           cssClass: 'alert-button-confirm',
           handler:  () => {
             this.sold(car);
           },
         },
       ],
     });
 
     await alert.present();
   }

}
