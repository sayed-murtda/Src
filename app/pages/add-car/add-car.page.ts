import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera} from '@capacitor/camera';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  styleUrls: ['./add-car.page.scss'],
})
export class AddCarPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  back(){
    this.navCtrl.navigateBack("/");
  }

  img(){
    this.selectImages();
  }

  async selectImages() {
    var options:any={
      correctOrientation:true,
      maximumImagesCount : 4,
      limit:4
    };
    Camera.pickImages(options).then((res)=>{
    var image= res.photos;
    if(image.length>3)
    alert('please select 3 only')
    else
      for(var i =0;i<3;i++){
        // this.saveImage(image[i])
      }

    })

    
  }
}
