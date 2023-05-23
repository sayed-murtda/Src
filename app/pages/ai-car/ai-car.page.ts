import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ActionSheetController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ai-car',
  templateUrl: './ai-car.page.html',
  styleUrls: ['./ai-car.page.scss'],
})
export class AiCarPage implements OnInit {
  imagesBlod :any[]=[];
  images:any[]=[];
  all={};
  car:number=0;
  model:any='';
  make:any='';
  color:any='';
  year:any='';
  constructor(private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    public translate: TranslateService,private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  delete(){
    this.images=[];
  }
  
  back(){
    this.navCtrl.back();
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
  async saveImage(photo: Photo) {
    const fileName = new Date().getTime() ;
    this.images.push({
      name:fileName,
      path:photo.webPath});
      console.log(this.images);
}

  async selectImage3() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos // Camera, Photos or Prompt!
  });


  if (image) {
      this.saveImage(image)
  }
	}
 

  send(){
    if(this.images.length>0)
    this.fetchBlob(this.images[0].path).then((ress:any) =>  this.sendBlobToPHP(ress));
    else
    console.log('add car');
  }
  printcar(){
    console.log("Adf");
  }
  disable:any=false;
  sendBlobToPHP(blob:any) {
    // Create a FormData object
    const formData = new FormData();
    
    // Append the blob to the FormData object
    formData.append('file', blob, 'image.png');
    this.showLoading()
    this.disable=true;
    // Send the FormData object via AJAX
    const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://localhost/ser/carapi/car.php'); // Replace 'upload.php' with the URL of your PHP script
    xhr.open('POST', 'https://sayedmurtdha.com/carapi/car.php'); // Replace 'upload.php' with the URL of your PHP script
    xhr.onload = () => {
      if (xhr.status === 200) {
        let cars = JSON.parse(xhr.responseText);
        let car = cars.detections;
        console.log(cars);
        console.log(car);
        this.all=car;
        this.color="colorWithMaxProbability";
        this.make="maxProbabilityDetails.make_name";
        this.model="maxProbabilityDetails.model_name";
        this.year="maxProbabilityDetails.years";
        // alert(JSON.stringify(xhr.responseText));
        this.print2(car);
        console.log('Image uploaded successfully');
      } else {
        this.car=-1;
        console.error('Image upload failed');
      }
      this.loading.dismiss();
      this.disable=false;

    };
    xhr.send(formData);

  }
   loading:any;
    async showLoading() {
      this.loading= await this.loadingCtrl.create({
      message: 'Please Waiting Al DETECTING CAR...',
    });
    this.loading.present();

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

test(){
  let a:any={
    "detections": [],
    "is_success": true,
    "meta": {
        "classifier": 2256,
        "md5": "F2FC0ED6F4A1C9EBD271F2FB01ED6773",
        "parameters": {
            "box_max_ratio": 3.15,
            "box_min_height": 180,
            "box_min_ratio": 1.0,
            "box_min_width": 180,
            "box_select": "center",
            "features": [
                "mmg"
            ],
            "region": [
                "DEF"
            ]
        },
        "time": 0.067
    }


};

let b:any={
  "detections": [],
  "is_success": true,
  "meta": {
      "classifier": 2256,
      "md5": "F2FC0ED6F4A1C9EBD271F2FB01ED6773",
      "parameters": {
          "box_max_ratio": 3.15,
          "box_min_height": 180,
          "box_min_ratio": 1.0,
          "box_min_width": 180,
          "box_select": "center",
          "features": [
              "mmg"
          ],
          "region": [
              "DEF"
          ]
      },
      "time": 0.067
  }
};

let c:any={
  "detections":
   [
      {
          "angle": [],
          "box": {
              "br_x": 0.9,
              "br_y": 0.8827,
              "tl_x": 0.0913,
              "tl_y": 0.0693
          },
          "class": {
              "name": "car",
              "probability": 0.9576
          },
          "color": [],
          "mm": [],
          "mmg": [
              {
                  "generation_id": 1903,
                  "generation_name": "III (W204)",
                  "make_id": 67,
                  "make_name": "Mercedes-Benz",
                  "model_id": 1379,
                  "model_name": "C-klasse",
                  "probability": 0.9999,
                  "years": "2006-2011"
              }
          ],
          "status": {
              "code": 0,
              "message": "",
              "selected": true
          },
          "subclass": [
              {
                  "name": "vehicle",
                  "probability": 1.0
              }
          ]
      },
      {
          "angle": [],
          "box": {
              "br_x": 0.4229,
              "br_y": 0.1317,
              "tl_x": 0.2789,
              "tl_y": 0.0186
          },
          "class": {
              "name": "truck",
              "probability": 0.4747
          },
          "color": [],
          "mm": [],
          "mmg": [],
          "status": {
              "code": 22,
              "message": "Box rejected. Width is 92 which is less than box_min_width 180",
              "selected": false
          },
          "subclass": []
      },
      {
          "angle": [],
          "box": {
              "br_x": 0.2954,
              "br_y": 0.1245,
              "tl_x": 0.1891,
              "tl_y": 0.0413
          },
          "class": {
              "name": "truck",
              "probability": 0.3924
          },
          "color": [],
          "mm": [],
          "mmg": [],
          "status": {
              "code": 22,
              "message": "Box rejected. Width is 68 which is less than box_min_width 180",
              "selected": false
          },
          "subclass": []
      },
      {
          "angle": [],
          "box": {
              "br_x": 0.9981,
              "br_y": 0.1564,
              "tl_x": 0.8715,
              "tl_y": 0.0346
          },
          "class": {
              "name": "car",
              "probability": 0.6216
          },
          "color": [],
          "mm": [],
          "mmg": [],
          "status": {
              "code": 22,
              "message": "Box rejected. Width is 81 which is less than box_min_width 180",
              "selected": false
          },
          "subclass": []
      }
  ],
  "is_success": true,
  "meta": {
      "classifier": 2256,
      "md5": "9D000A8D8516593E43B4EF22AA18F2CF",
      "parameters": {
          "box_max_ratio": 3.15,
          "box_min_height": 180,
          "box_min_ratio": 1.0,
          "box_min_width": 180,
          "box_select": "center",
          "features": [
              "mmg"
          ],
          "region": [
              "DEF"
          ]
      },
      "time": 0.122
  }
};

let f={
  "detections": [
      {
          "angle": [],
          "box": {
              "br_x": 0.9303,
              "br_y": 0.8432,
              "tl_x": 0.041,
              "tl_y": 0.1594
          },
          "class": {
              "name": "car",
              "probability": 0.963
          },
          "color": [
              {
                  "id": 72,
                  "name": "Blue",
                  "probability": 0.4802
              },
              {
                  "id": 71,
                  "name": "Light Blue",
                  "probability": 0.1883
              },
              {
                  "id": 68,
                  "name": "Gray",
                  "probability": 0.1664
              }
          ],
          "mm": [
              {
                  "make_id": 48,
                  "make_name": "Jaguar",
                  "model_id": 7921,
                  "model_name": "Other",
                  "probability": 0.7722
              },
              {
                  "make_id": 54,
                  "make_name": "Lamborghini",
                  "model_id": 1159,
                  "model_name": "Urus",
                  "probability": 0.0946
              },
              {
                  "make_id": 30,
                  "make_name": "Ford",
                  "model_id": 698,
                  "model_name": "Mustang",
                  "probability": 0.0619
              }
          ],
          "mmg": [
              {
                  "generation_id": 11447,
                  "generation_name": "Other",
                  "make_id": 48,
                  "make_name": "Jaguar",
                  "model_id": 7921,
                  "model_name": "Other",
                  "probability": 0.7722,
                  "years": "-"
              },
              {
                  "generation_id": 1589,
                  "generation_name": "I",
                  "make_id": 54,
                  "make_name": "Lamborghini",
                  "model_id": 1159,
                  "model_name": "Urus",
                  "probability": 0.0946,
                  "years": "2017-2022"
              },
              {
                  "generation_id": 934,
                  "generation_name": "VI facelift",
                  "make_id": 30,
                  "make_name": "Ford",
                  "model_id": 698,
                  "model_name": "Mustang",
                  "probability": 0.0619,
                  "years": "2017-"
              }
          ],
          "status": {
              "code": 0,
              "message": "",
              "selected": true
          },
          "subclass": [
              {
                  "name": "vehicle",
                  "probability": 1.0
              }
          ]
      }
  ],
  "is_success": true,
  "meta": {
      "classifier": 2256,
      "md5": "5CBA52E2FF1F8AC2572B8EE5C0B6DA5C",
      "parameters": {
          "box_max_ratio": 3.15,
          "box_min_height": 180,
          "box_min_ratio": 1.0,
          "box_min_width": 180,
          "box_select": "center",
          "features": [
              "mm",
              "mmg",
              "color"
          ],
          "region": [
              "DEF"
          ]
      },
      "time": 0.141
  }
};

// console.log(a);
// console.log(b);
console.log(f);
this.print2(f.detections);




}

print2(car:any){
if(car.length>0){
  this.car=1;

console.log(car);
let probabilities = car[0].color;
let mmg = car[0].mmg;
console.log(probabilities);
let maxProbability = 0;
let colorWithMaxProbability = '';

for (let i = 0; i < probabilities.length; i++) {
  const { probability, name } = probabilities[i];
  if (probability > maxProbability) {
    maxProbability = probability;
    colorWithMaxProbability = name;
  }
}
console.log('Color with Maximum Probability:', colorWithMaxProbability);

maxProbability = 0;
let maxProbabilityDetails:any = {};
for (let i = 0; i < mmg.length; i++) {
  const { make_name, model_name, years, probability } = mmg[i];
  if (probability > maxProbability) {
    maxProbability = probability;
    maxProbabilityDetails = { make_name, model_name, years };
  }
}
this.color=colorWithMaxProbability;
this.make=maxProbabilityDetails.make_name;
this.model=maxProbabilityDetails.model_name;
this.year=maxProbabilityDetails.years;
console.log('Make Name:', maxProbabilityDetails.make_name);
console.log('Model Name:', maxProbabilityDetails.model_name);
console.log('Years:', maxProbabilityDetails.years);
}
else {
  this.car=-1;
  console.log("no car");
  
}
}





}
