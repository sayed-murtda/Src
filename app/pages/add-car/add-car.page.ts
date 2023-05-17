import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { car, CarsService } from '../../Service/cars.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { UserService } from '../../Service/user.service';
import {  Router } from '@angular/router';
import { LanguageService } from '../../language.service';
import { ShowroomService } from '../../Service/showroom.service';





@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  styleUrls: ['./add-car.page.scss'],
})
export class AddCarPage implements OnInit {
  
  AI_rate: any = 0;
  avg_price: any = 0;
  avg_km: any = 0;
  counter: any =0;
  get_price: any; // ok
  get_km:any; // ok
  AI_price: any;
  AI_model: any;
  AI_year: any;
  AI_KM: any;
  cars:any[] = [];

  rate_car(){
    // alert('price '+this.get_price +' - km '+this.get_km)
    
    
    let avgKm:any = 0;
    let avgPrice:any = 0;
      this.CarSrv.get_by_model(this.brand[this.AddCarForm.get('Brand')?.value].Models[this.AddCarForm.get('Model')?.value]).then((res)=>{
        if(res){
        this.cars=res;
        console.log(this.cars);

        this.cars.forEach(car => {
          //  alert(this.AI_year)
          if(car.Year == this.AI_year){
            this.counter++;
            avgPrice +=car.Price;
            avgKm += car.KM;
          }
        });
        
        if(this.counter !=0){
        avgPrice = avgPrice/this.counter;
        avgKm = avgKm/this.counter;
        alert(avgPrice +'-'+avgKm)
        this.AI_price = (avgPrice/this.get_price)*10;
        this.AI_KM = (avgKm/this.get_km)*10;

        //--------------------

        let rating_price: number;
        
        if (this.get_price <= avgPrice) {
          rating_price= 10;
        } else if (this.get_price >= avgPrice * 1.1 && this.get_price < avgPrice * 1.2) {
          rating_price = 6;
        } else if (this.get_price >= avgPrice * 1.2 && this.get_price < avgPrice * 1.3) {
          rating_price = 3;
        } else {
          rating_price = 1;
        }

        
        
        // if(this.AI_price >10)
        // this.AI_price =10;

        let rating_km: number;

        if(this.get_km <= avgKm){
        rating_km =10;
      } else if (this.get_km >= avgKm * 1.1 && this.get_km < avgKm * 1.2) {
        rating_km = 9;
      } else if (this.get_km >= avgKm * 1.2 && this.get_km < avgKm * 1.3) {
        rating_km = 8;
      }else if (this.get_km >= avgKm * 1.3 && this.get_km < avgKm * 1.4) {
        rating_km = 7;
      }else if (this.get_km >= avgKm * 1.4 && this.get_km < avgKm * 1.5) {
        rating_km = 6;
      }else if (this.get_km >= avgKm * 1.5 && this.get_km < avgKm * 1.6) {
        rating_km = 5;
      }else if (this.get_km >= avgKm * 1.6 && this.get_km < avgKm * 1.7) {
        rating_km = 4;
      }else if (this.get_km >= avgKm * 1.7 && this.get_km < avgKm * 1.8) {
        rating_km = 3;
      }else if (this.get_km >= avgKm * 1.8 && this.get_km < avgKm * 1.9) {
        rating_km = 2;
      } else {
        rating_km = 1;
      }
        
        this.AI_rate = (rating_price+rating_km)/2;
        alert(rating_price+' - '+rating_km+' - '+this.AI_rate)
        }
        else
        this.AI_rate = '--';


        

        }
      });

      
  

  }

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
    private route:Router,
    public langSrv:LanguageService,
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
    this.rate_car();
    let id:string=this.UserSrv.User.id;
    let idshoow:string=this.UserSrv.User.id;
    if(this.langSrv.user.type=='showroom'){
      this.Loginshowroom(val);
    } else if ( this.AddCarForm.valid && this.images.length>0 ){
     
      var today = new Date();
      var yyyy = today.getFullYear();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var HH = String(today.getHours() + 1).padStart(2, '0'); //January is 0!
      var MM = String(today.getMinutes() + 1).padStart(2, '0'); //January is 0!
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
        rate:this.AI_rate,
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

  Loginshowroom(val:any){
    this.rate_car();
    let id:string=this.UserSrv.User.id;
    this.AddCarForm.get('Tell')?.setValue('00000000');
    this.AddCarForm.get('WhatsApp')?.setValue('00000000');
    if ( this.AddCarForm.valid && this.images.length>0 ){
     
      var today = new Date();
      var yyyy = today.getFullYear();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var HH = String(today.getHours() + 1).padStart(2, '0'); //January is 0!
      var MM = String(today.getMinutes() + 1).padStart(2, '0'); //January is 0!
      let now =  dd + '/' + mm + '/' + yyyy;
      let i=mm + '/' + dd + '/' + yyyy;
      let index:number=99999999-parseInt(yyyy+mm+dd+HH+MM);
      let car : car={...this.AddCarForm.value,
        Brand:this.brand[this.AddCarForm.get('Brand')?.value].id,
        Model:this.brand[this.AddCarForm.get('Brand')?.value].Models[this.AddCarForm.get('Model')?.value],
        date:now.toString(),
        index:index,
        Showrooms_id:id,
        Sold_date:null,
        Sold:false,
        accept:false,
        rate:this.AI_rate,
        Image_index:this.images.length,
      }
      console.log(car);
      
      this.images.forEach((res:any) =>{
         this.fetchBlob(res.path).then((ress:any) =>  this.imagesBlod.push(ress))      } )
      
      this.CarSrv.loading=true;
      this.back();
      this.CarSrv.addCarShowrooms(car,this.imagesBlod).then(()=>{
        console.log("done all add with image - addCarShowrooms");
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
