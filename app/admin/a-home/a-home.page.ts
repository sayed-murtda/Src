import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-a-home',
  templateUrl: './a-home.page.html',
  styleUrls: ['./a-home.page.scss'],
})
export class AHomePage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  goTo(url:any){
    this.navController.navigateRoot(url);

  }

}
