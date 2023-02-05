import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { car, CarsService } from '../../Service/cars.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Filesystem } from '@capacitor/filesystem';




@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  styleUrls: ['./add-car.page.scss'],
})
export class AddCarPage implements OnInit {

  AddCarForm: FormGroup;
  imagesBlod :any[]=[];
  images:any[]=[];
  constructor(private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    public formbuilder: FormBuilder,
    public translate: TranslateService,
    private CarSrv:CarsService
    ) {
      this.AddCarForm = formbuilder.group({
        Price: ['2999', Validators.compose([Validators.required,Validators.pattern('[0-9]*'), Validators.min(100), Validators.max(100000)])],
        Brand: ['fsdf', Validators.compose([Validators.required])],
        Model: ['sdfds', Validators.compose([Validators.required])],
        Year: ['2020', Validators.compose([Validators.required,Validators.pattern('[0-9]*'),Validators.min(1900), Validators.max(2024)])],
        KM: ['34324', Validators.compose([Validators.required,Validators.pattern('[0-9]*'),Validators.min(0), Validators.max(1000000)])],
        New: ['false', Validators.compose([Validators.required])],
        Disc: ['sfd'],
        Tell: ['33333333', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(8)])],
        WhatsApp: ['33333333', Validators.compose([ Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(8)])],        
        });

        
    }

  ngOnInit() {
  }

  Login(val:any){
    if ( this.AddCarForm.valid  ){
      const now = new Date();

      let car : car={...this.AddCarForm.value,
        date:now,
        User_id:null,
        Sold_date:null,
        Sold:false,
        accept:false
      }
      this.images.forEach((res:any) =>{
         this.fetchBlob(res.path).then((ress:any) =>  this.imagesBlod.push(ress))      } )
      
      this.CarSrv.addCar(car,this.imagesBlod).then(()=>{
        console.log("done all add with image");
      });
    }
    else {
      this.translate.get('addcars.AlertSend').subscribe(
        value => {
          this.presentAlert(value);
        }
      )
    }
  //  alert('Login Successful ' + val.username);
  }

  fetchBlob(uri:any) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', uri);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (error) => {
        reject(error);
      };
      xhr.send();
    });
  }
 
  

  back(){
    this.navCtrl.navigateBack("/");
  }

  async presentAlert(mas:any) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: mas,
      buttons: ['OK'],
    });

    await alert.present();
  }


  async img(){
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Camera',
          icon:'camera',
          handler: ()=>{
            this.selectImage();
          }
        },
        {
          text: 'Gallery',
          icon:'image',
          handler: ()=>{
            this.selectImages();
          }
        },
        {
          text: 'Cancel',
          role: 'cancsel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    actionSheet.present();

  }

  delete(i:any){
    this.images.splice(i,1)
  }

 
  

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera // Camera, Photos or Prompt!
  });


  if (image) {
      this.saveImage(image)
  }
	}

  async selectImages() {
    var options:any={
      correctOrientation:true,
      maximumImagesCount : 4,
      limit:4
    };
    Camera.pickImages(options).then((res: any)=>{
    var image:any[]= res.photos;
    if(image.length+this.images.length>4)
    this.translate.get('addcars.AlertImg').subscribe(
      value => {
        this.presentAlert(value);
      }
    )
    else
      for(var i =0;i<image.length;i++){
        this.saveImage(image[i])
      }
      console.log(this.images);
      

    })
  }

  async saveImage(photo: Photo) {
    const filePath = 'phone/';
    const fileName = new Date().getTime() ;
    this.images.push({
      name:fileName,
      path:photo.webPath});
      console.log(this.images);
 
}

}
