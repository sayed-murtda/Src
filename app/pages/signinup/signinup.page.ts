import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { userInfo } from 'os';

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
  constructor(public UserSrv:UserService) {
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
  signup(email:any,password:any){
    console.log(this.user);
    this.UserSrv.adduser(email,password,this.user);
  }

}
