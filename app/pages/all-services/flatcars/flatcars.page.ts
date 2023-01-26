import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flatcars',
  templateUrl: './flatcars.page.html',
  styleUrls: ['./flatcars.page.scss'],
})
export class FlatcarsPage implements OnInit {

  constructor() { }

  flatOwners = [{
    name:'Ali Yusuf Ahmed',
    city:'Sitra',
    number:'35053631'
  },{
    name:'Sayed Ali Mohammed',
    city:'Sitra',
    number:'34567890'
  },{
    name:'Sayed Murtadha Hashem',
    city:'Miqsha',
    number:'66666666'
  },
  ]

  ngOnInit() {
  }

}
