import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showroom-profile',
  templateUrl: './showroom-profile.page.html',
  styleUrls: ['./showroom-profile.page.scss'],
})
export class ShowroomProfilePage implements OnInit {

  constructor(public UserSrv:UserService, public route: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){    
    if(this.UserSrv.isSingin()){
      console.log("hiprofile");
      console.log(this.UserSrv.User)
    }else{
      this.route.navigateByUrl('/signinup');
    }
   }

  out(){
    this.route.navigateByUrl('/');
    this.UserSrv.out()
  }

}
