import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../../Service/user.service';

@Component({
  selector: 'app-a-home',
  templateUrl: './a-home.page.html',
  styleUrls: ['./a-home.page.scss'],
})
export class AHomePage implements OnInit {

  constructor(private navController: NavController,public UserSrv:UserService) { }

  ngOnInit() {
  }

  goTo(url:any){
    this.navController.navigateRoot(url);

  }

  out(){
    this.navController.navigateRoot('/');
    this.UserSrv.out()
  }


}
