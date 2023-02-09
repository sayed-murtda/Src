import { Component, OnInit } from '@angular/core'; 
import { NavController } from '@ionic/angular';
import { CarsService } from '../../Service/cars.service';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.page.html',
  styleUrls: ['./view-detail.page.scss'],
}) 
export class ViewDetailPage implements OnInit {
  count = 0;
  num_of_img :any[] = [];
  constructor(private navCtrl: NavController, public CarsSrv:CarsService) { 
    while(this.count<CarsSrv.detail_ID.Image_index){
      this.count++;
      this.num_of_img.push(this.count);
      console.log(this.num_of_img.length);
    }
    
  }
   

  ngOnInit() {
  }

  go(){
    this.navCtrl.navigateBack("/");
  }

  likeCar(id:any){
    this.CarsSrv.Save_fav_ID(id);

  }

  Unlike(id:any){

    let i = this.CarsSrv.fav_ID.indexOf(id);
    this.CarsSrv.fav_ID.splice(i,1);
    this.CarsSrv.save_unlike();
   
   }

  

}
