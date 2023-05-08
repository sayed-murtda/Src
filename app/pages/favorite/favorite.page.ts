import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../Service/cars.service';
@Component({ 
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  Cars:any[]=[];
  constructor(public CarsSrv:CarsService) {
    CarsSrv.get_everything().then((res)=>{
      if(res){
      this.Cars=res;
      console.log(this.Cars);
      }
    });
   }

  ngOnInit() {
  }

  Unlike(id:any){

    let i = this.CarsSrv.fav_ID.indexOf(id);
    this.CarsSrv.fav_ID.splice(i,1);
    this.CarsSrv.save_unlike();
 
 
     
   }

}
