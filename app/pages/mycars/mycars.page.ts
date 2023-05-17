import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
    
  constructor(      private navCtrl: NavController  ,public CarSrv:CarsService ,public UserSrv:UserService ) {
    console.log(UserSrv.User.id);
    let id=UserSrv.User.id;
    CarSrv.getacceptforshowroom(id,'Showrooms_id').then(res=> this.accept=res)

    console.log(this.accept);
    
   }

  ngOnInit() {
  }
 
  back(){
    this.navCtrl.navigateBack("/");
  }
}
