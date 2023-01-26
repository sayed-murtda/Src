import { Component, OnInit } from '@angular/core';

interface Car{
  name: string;
  price: number;
  year: number;
  img: string;
  discription: string;
  like: boolean;
}
@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  Available_adv = true;
  filter = false;
  car_selected_brand: any;
  first_year:any;
  last_year: any;
  toyota = false;
  Nissan = false;

  toyota_cars: any[] = [
                          "All",
                          "4Runner",
                          "86",
                          "Aurion",
                          "Avensis",
                          "Camry",
                          "Celica",
                          "Corolla",
                          "Corona",
                          "Cressida",
                          "Crown",
                          "Echo",
                          "FJ Cruiser",
                          "Fortuner",
                          "Hiace",
                          "Highlander",
                          "Hilux",
                          "IQ",
                          "Innova",
                          "Land Cruiser",
                          "Land Cruser 76",
                          "Other",
                          "Prado",
                          "Previa",
                          "Prius",
                          "Rav 4",
                          "Scion",
                          "Sequoia",
                          "Starlet",
                          "Supra",
                          "Tacoma",
                          "Tercel",
                          "Tundra",
                          "XA",
                          "Yaris",
                          "Zelas",
                          "Avanza",
                       ];

    Nissan_cars: any[] = [
                          "All",
                          "300ZX",
                          "350Z",
                          "370Z",
                          "Altima",
                          "Armada",
                          "Bluebird",
                          "Datsun",
                          "GT-R",
                          "Gloria",
                          "Juke",
                          "Livina",
                          "March",
                          "Maxima",
                          "Micra",
                          "Murano",
                          "Navara",
                          "Pathfinder",
                          "Patrol",
                          "Qashqai",
                          "S130",
                          "Sentra",
                          "Skyline",
                          "Sunny",
                          "Terrano",
                          "Tiida",
                          "Titan",
                          "Van",
                          "X-Trail",
                          "Xterra",
                         ];


  cars: Car[] = [

    {
    name: 'Sonata',
    price: 3000 ,
    year:2016,
    img: 'sonata2016.jpg',
    discription:'nice',
    like: true
    },

    {
      name: 'Sonata',
      price: 3000 ,
      year:2016,
      img: 'sonata2016.jpg',
      discription:'nice',
      like: true
    },

    {
        name: 'Sonata',
        price: 3000 ,
        year:2016,
        img: 'sonata2016.jpg',
        discription:'nice',
        like: true
    },
    {
      name: 'Sonata',
      price: 3000 ,
      year:2016,
      img: 'sonata2016.jpg',
      discription:'nice',
      like: true
  },
  {
    name: 'Sonata',
    price: 3000 ,
    year:2016,
    img: 'sonata2016.jpg',
    discription:'nice',
    like: true
},
{
  name: 'Sonata',
  price: 3000 ,
  year:2016,
  img: 'sonata2016.jpg',
  discription:'nice',
  like: true
},

  ];

  likeCar(i:any){
    // console.log(i);
    this.cars[i].like = !this.cars[i].like;

  }

  display_filter(){
    this.filter = !this.filter;

  }

  viewCars(){
    this.not_show();
    if(this.car_selected_brand == "toyota"){
      this.toyota = true;
    }
    if(this.car_selected_brand == "Nissan"){
      this.Nissan = true;
    }
    
  }

  not_show(){
    this.toyota = false;
    this.Nissan = false;
  }

}
