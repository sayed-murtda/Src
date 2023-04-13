import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { userInfo } from 'os';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signinup',
  templateUrl: './signinup.page.html',
  styleUrls: ['./signinup.page.scss'],
})
export class SigninupPage implements OnInit {
sign="signin";
email='';
password='';
user:any={
  type:'user'
};
  constructor(public UserSrv:UserService,
    public route: Router) {
   }

  ngOnInit() {
  }


  login(email:any,password:any){
    this.UserSrv.loginUser(email,password);
  }
  reset(email:any){
    this.UserSrv.resetPassword(email);
  }
  logout(){
    this.UserSrv.logoutUser;
  }
  signup(password:any){
    console.log(this.user);
    this.UserSrv.adduser(this.user?.email,password,this.user);
  }

  close(){
    this.route.navigateByUrl('/');
  }

}
