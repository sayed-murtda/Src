import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CarsService } from '../../Service/cars.service';
import { UserService } from '../../Service/user.service';

@Component({
  selector: 'app-mycars',
  templateUrl: './mycars.page.html',
  styleUrls: ['./mycars.page.scss'],
})
export class MycarsPage implements OnInit {
    waitCars:any[]=[];
    accept:any[]=[];
    Sold:any[]=[];


    
  constructor(      private navCtrl: NavController  ,public CarSrv:CarsService ,public UserSrv:UserService,private alertController: AlertController ) {
    console.log(UserSrv.User.id);
    let type='Showrooms_id';

    let id=UserSrv.User.id;
    if(UserSrv.gettype()=='user')
     type='User_id';
    
    CarSrv.getacceptforshowroom(id,type).then(res=> this.accept=res)
    CarSrv.getWaitforshowroom(id,type).then(res=> this.waitCars=res)
    CarSrv.getSoldforshowroom(id,type).then(res=> this.Sold=res)


    console.log(this.accept);
    
   }

  ngOnInit() {
  }
 
  back(){
    this.navCtrl.navigateBack("/");
  }

  delete(id:any){
    alert(id);
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



}
