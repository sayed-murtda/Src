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

}
