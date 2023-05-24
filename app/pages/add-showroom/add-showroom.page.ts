import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Showroom, ShowroomService } from '../../Service/showroom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Filesystem } from '@capacitor/filesystem';
import { log } from 'console';

@Component({
  selector: 'app-add-showroom',
  templateUrl: './add-showroom.page.html',
  styleUrls: ['./add-showroom.page.scss'],
})
export class AddShowroomPage implements OnInit {

  AddCarForm: FormGroup;
  imagesBlod :any[]=[];
  images:any[]=[];
  Showroom:Showroom = {} as Showroom;
  constructor(private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    public formbuilder: FormBuilder,
    public translate: TranslateService,
    public showSrv:ShowroomService,
    ) {
      this.AddCarForm = formbuilder.group({
        Name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(0), Validators.maxLength(30)])],
        Email: ['', Validators.compose([Validators.required])],
        Password:['', Validators.compose([Validators.required])],
        City: ['', Validators.compose([Validators.required])],
        Insta: ['', Validators.compose([Validators.required])],
        Location: ['', Validators.compose([Validators.required])],
        Tell: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(8)])],
        WhatsApp: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(8)])],
        
        });

        
    }

  ngOnInit() {
  }

  
submit(){
}

  Login(val:any){
    if ( this.AddCarForm.valid && this.images.length==1 || true){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      let now =  dd + '/' + mm + '/' + yyyy;
      let Showroom : any={...this.AddCarForm.value,
        date:now,
        hours:['','','','','','','']
      }
      this.images.forEach((res:any) =>{
         this.fetchBlob(res.path).then((ress:any) =>  this.imagesBlod.push(ress))      } )
      this.showSrv.loading=true;
      this.back();
      this.showSrv.addShowroom(Showroom,this.imagesBlod).then(()=>{
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
    this.navCtrl.back();
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
            this.selectImage3();
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

  delete(){
    this.images=[];
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

  async selectImage3() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos // Camera, Photos or Prompt!
  });


  if (image) {
      this.saveImage(image)
  }
	}

  async selectImages() {
    var options:any={
      correctOrientation:true,
      maximumImagesCount : 1,
      limit:1
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
    const fileName = new Date().getTime() ;
    this.images.push({
      name:fileName,
      path:photo.webPath});
      console.log(this.images);
}

}