import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Service/user.service';

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
    password:'1234'
  }];

 
  constructor(public UserSrv:UserService,
    public route: Router) {   }
   ionViewWillEnter(){    
    if(this.UserSrv.isSingin()){
      console.log("hiprofile");
      console.log(this.UserSrv.User)
    }else{
      this.route.navigateByUrl('/signinup');
    }
   }
  ngOnInit() {

  }

  out(){
    this.route.navigateByUrl('/');
    this.UserSrv.out()
  }

}
