import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showrooms',
  templateUrl: './showrooms.page.html',
  styleUrls: ['./showrooms.page.scss'],
})
export class ShowroomsPage implements OnInit {

  constructor() { }
  showrooms =[{
    name:'Honda Showroom',
    city:'Muharraq',
    location:'https://goo.gl/maps/nuE3yZnBUFNHqxETA',
    number:'177171607',
    whatsapp:'35053631',
    instagram:'https://www.instagram.com/honda/?hl=en',
    logo:'https://www.freeiconspng.com/thumbs/honda-logo-png/honda-logo-png-picture-20.png'
  },{
    name:'Miami Cars Showroom',
    city:'Budayia',
    location:'https://goo.gl/maps/b1v3ZxcjRPckJU7f6',
    number:'17734567',
    whatsapp:'33834044',
    instagram:'https://www.instagram.com/theshowroom.miami/?hl=en',
    logo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlSvbsnFKVMBFR3H3CmLgKrQebeJ1jvF5q5TJ-NFLICw&s'
  }]
  ngOnInit() {
  }

}
