import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { car, CarsService } from '../../Service/cars.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { UserService } from '../../Service/user.service';
import {  Router } from '@angular/router';





@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  styleUrls: ['./add-car.page.scss'],
})
export class AddCarPage implements OnInit {

  AddCarForm: FormGroup;
  imagesBlod :any[]=[];
  images:any[]=[];
  brand:any[]=[];
  brandindex=0;
  constructor(
        private CarSrv:CarsService,
      private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    public formbuilder: FormBuilder,
    public translate: TranslateService,
    private UserSrv:UserService,
    private route:Router
    ) {
      if(this.UserSrv.isSingin()){
        console.log("hiprofile");
        console.log(this.UserSrv.User)
      }else{
        this.route.navigateByUrl('/signinup');
      }
      this.brand=CarSrv.brand;
      this.AddCarForm = formbuilder.group({
        Price: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*'), Validators.min(100), Validators.max(100000)])],
        Brand: ['', Validators.compose([Validators.required])],
        Model: ['', Validators.compose([Validators.required])],
        Year: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*'),Validators.min(1900), Validators.max(2024)])],
        KM: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*'),Validators.min(0), Validators.max(1000000)])],
        New: ['', Validators.compose([Validators.required])],
        Disc: [''],
        Tell: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(8)])],
        WhatsApp: ['', Validators.compose([ Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(8)])],        
        });   
    }

  ngOnInit() {
  }

  Login(val:any){
    let id:string=this.UserSrv.User.id;
    // console.log(id);
    // this.send(this.images[0]);
    if ( this.AddCarForm.valid && this.images.length>0 ){
     
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var HH = String(today.getHours() + 1).padStart(2, '0'); //January is 0!
      var MM = String(today.getMinutes() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      let now =  dd + '/' + mm + '/' + yyyy;
      let i=mm + '/' + dd + '/' + yyyy;
      let index:number=99999999-parseInt(yyyy+mm+dd+HH+MM);
      let car : car={...this.AddCarForm.value,
        Brand:this.brand[this.AddCarForm.get('Brand')?.value].id,
        Model:this.brand[this.AddCarForm.get('Brand')?.value].Models[this.AddCarForm.get('Model')?.value],
        date:now.toString(),
        index:index,
        User_id:id,
        Sold_date:null,
        Sold:false,
        accept:false,
        Image_index:this.images.length,
      }
      console.log(car);
      
      this.images.forEach((res:any) =>{
         this.fetchBlob(res.path).then((ress:any) =>  this.imagesBlod.push(ress))      } )
      
      this.CarSrv.loading=true;
      this.back();
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
    const fileName = new Date().getTime() ;
    this.images.push({
      name:fileName,
      path:photo.webPath});
      console.log(this.images);
}

send(image:any){
  this.fetchBlob(image.path).then((ress:any) =>  this.sendBlobToPHP(ress));  
}

convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader;
  reader.onerror = reject;
  reader.onload = () => {
      resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});

async startUpload(file: any) {
  const response = await fetch(file.data);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append('file', blob, file.name);
  console.log(formData);
}



 uploadFile(inputElement:any) {
  var file = inputElement.files[0];
  var reader:any = new FileReader();
  reader.onloadend = function() {
    console.log('Encoded Base 64 File String:', reader.result);
    
    /******************* for Binary ***********************/
    var data=(reader.result).split(',')[1];
     var binaryBlob = atob(data);
     console.log('Encoded Binary File String:', binaryBlob);
  }
  reader.readAsDataURL(file);
}

convertImageToBinary(event: any) {
  const file = event;
  console.log(event);
  const reader = new FileReader();

  reader.onload = () => {
    const imageData = reader.result as string;
    const binaryData = window.btoa(imageData);
    this.sendapi(binaryData);
    console.log(binaryData);
  };

  reader.readAsBinaryString(file);
}

async convertBlobToBinary(blob: Blob){
  const reader = new FileReader();
  let binaryData:any="2423";
  reader.onload = () => {
    binaryData = reader.result as ArrayBuffer;
    return binaryData;

  }
//   reader.readAsArrayBuffer(blob);
//  return reader;
  

}

async  convertImageToBinary2(imagePath: string): Promise<string> {
  // Read the image file as binary data
  const fileData = await Filesystem.readFile({
    path: imagePath,
    directory: Directory.Data // Adjust the directory based on your image file's location
  });

  // Convert the file data to a base64 string
  const base64Data = fileData.data;

  // Return the base64 string
  return base64Data;
}

convertToBinaryString(image:any) {
  fetch(image.webPath)
    .then(response => response.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const binaryString = reader.result;
        console.log(binaryString);
      };
      reader.readAsBinaryString(blob);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
convertToBinaryString2(image:any) {
  return new Promise((resolve, reject) => {
    fetch(image.webPath)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const binaryString = reader.result;
          resolve(binaryString);
        };
        reader.onerror = reject;
        reader.readAsBinaryString(blob);
      })
      .catch(error => {
        reject(error);
      });
  });
}

sendapi(data:any){
  console.log("------------sendapi-------");
  console.log(data);
  console.log("-------------------");
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
      console.log('yes');
      console.log(this.responseText);
    }else
    console.log('yes2');
  });

  xhr.open("POST", "http://localhost/ser/carapi/car.php");
  xhr.open("POST", "https://sayedmurtdha.com/carapi/car.php");
  // xhr.setRequestHeader("accept", "application/json");
  // xhr.setRequestHeader("api-key", "7e6131b9-a422-4f95-98a2-581e3374cac9");
  xhr.setRequestHeader("Content-Type", "application/octet-stream");
  xhr.send(JSON.stringify(data));
}

 sendBlobToPHP(blob:any) {
  // Create a FormData object
  const formData = new FormData();
  
  // Append the blob to the FormData object
  formData.append('file', blob, 'image.png');
  
  // Send the FormData object via AJAX
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost/ser/carapi/car.php'); // Replace 'upload.php' with the URL of your PHP script
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log(this.responseText);
      console.log('Image uploaded successfully');
    } else {
      console.error('Image upload failed');
    }
  };
  xhr.send(formData);
}



}
