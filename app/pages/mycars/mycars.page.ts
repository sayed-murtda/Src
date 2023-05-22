import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CarsService } from '../../Service/cars.service';
import { UserService } from '../../Service/user.service';
import { type } from 'os';

@Component({
  selector: 'app-mycars',
  templateUrl: './mycars.page.html',
  styleUrls: ['./mycars.page.scss'],
})
export class MycarsPage implements OnInit {
    waitCars:any[]=[];
    accept:any[]=[];
    Sold:any[]=[];
    type:any='';
    id:any='';
    
  constructor(      private navCtrl: NavController  ,public CarSrv:CarsService ,public UserSrv:UserService,private alertController: AlertController ) {
    console.log(UserSrv.User.id);
     this.type='Showrooms_id';

    this.id=UserSrv.User.id;
    if(UserSrv.gettype()=='user')
    this.type='User_id';
    
    CarSrv.getacceptforshowroom(this.id,this.type).then(res=> this.accept=res)
    CarSrv.getWaitforshowroom(this.id,this.type).then(res=> this.waitCars=res)
    CarSrv.getSoldforshowroom(this.id,this.type).then(res=> this.Sold=res)


    console.log(this.accept);
    
   }

  ngOnInit() {
  }
 
  back(){
    this.navCtrl.navigateBack("/");
  }

  delete(car:any){
   this.CarSrv.deleteWaitingCars(car.id).then(()=>{
    this.CarSrv.addfinshcar(car).then(()=> {
    
    this.CarSrv.getacceptforshowroom(this.id,this.type).then(res=> this.accept=res)
    this.CarSrv.getWaitforshowroom(this.id,this.type).then(res=> this.waitCars=res)
    this.CarSrv.getSoldforshowroom(this.id,this.type).then(res=> this.Sold=res)

    });
   })
  }

  sold(car:any){
    this.CarSrv.deleteAcceptCars(car.id).then(()=>{
      this.CarSrv.addfinshcar(car).then(()=> {
      this.CarSrv.getacceptforshowroom(this.id,this.type).then(res=> this.accept=res)
      this.CarSrv.getWaitforshowroom(this.id,this.type).then(res=> this.waitCars=res)
      this.CarSrv.getSoldforshowroom(this.id,this.type).then(res=> this.Sold=res)
  
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
            this.delete(car);
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertSold(car:any) {
    const alert = await this.alertController.create({
      header: 'Are you sure to Complete ٍSold ?',
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
