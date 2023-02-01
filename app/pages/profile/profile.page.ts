import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile =[{
    name:"Ali Yusuf",
    username:"3li.Yusuf",
    email:"alcndb@gmail.com",
    phone:"35053631",
    gender:"Male",
    password: "123456",


  }]
  constructor() { }

  ngOnInit() {
  }

}
