import { Component, OnInit } from '@angular/core'; 
import { NavController } from '@ionic/angular';
import { CarsService } from '../../Service/cars.service';
import { ShowroomService } from '../../Service/showroom.service';
 
@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.page.html',
  styleUrls: ['./view-detail.page.scss'],
}) 
export class ViewDetailPage implements OnInit {
  count = 0;
  num_of_img :any[] = [];
  detail_cars: any[] = [];
  showroom:any={};
  constructor(private navCtrl: NavController, public CarsSrv:CarsService,    public ShowSrv:ShowroomService    ) {
    if(!CarsSrv.detail_ID?.id)
    this.go();

    if(CarsSrv.detail_ID?.Showrooms_id)
    ShowSrv.getShowroomById(CarsSrv.detail_ID?.Showrooms_id).then((res)=> {
      this.showroom=res;
    }
    );

    while(this.count<CarsSrv.detail_ID.Image_index){
      this.count++;
      this.num_of_img.push(this.count);
      console.log(this.num_of_img.length);
    }


    
   

    
  }

  ionViewWillEnter(){
    if(!this.CarsSrv.detail_ID.id)
    this.go();
    
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
