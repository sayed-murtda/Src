import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { car, CarsService } from '../../Service/cars.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  styleUrls: ['./add-car.page.scss'],
})
export class AddCarPage implements OnInit {

  AddCarForm: FormGroup;


  images:any[]=[];
  car:car = {} as car;
  constructor(private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private CarSrv:CarsService,
    public formbuilder: FormBuilder
    ) {
      this.AddCarForm = formbuilder.group({
        username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(8), Validators.maxLength(30)])],
        Price: ['', Validators.compose([Validators.required])],
        Brand: ['', Validators.compose([Validators.required])],
        Model: ['', Validators.compose([Validators.required])],
        Year: ['', Validators.compose([Validators.required])],
        Killometers: ['', Validators.compose([Validators.required])],
        State: ['', Validators.compose([Validators.required])],
        Discription: ['', Validators.compose([Validators.required])],
        Tell: ['', Validators.compose([Validators.required])],
        WhatsApp: ['', Validators.compose([Validators.required])],
        
        });

        
    }

  ngOnInit() {
  }

  Login(val:any){
    if ( this.AddCarForm.valid )
    console.log(this.AddCarForm);
    
  //  alert('Login Successful ' + val.username);
  }
 

 
  

  back(){
    this.navCtrl.navigateBack("/");
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Please,You can Select 4 Images Maximum',
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
    this.presentAlert();
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
