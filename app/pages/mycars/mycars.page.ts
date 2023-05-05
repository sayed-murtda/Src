import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mycars',
  templateUrl: './mycars.page.html',
  styleUrls: ['./mycars.page.scss'],
})
export class MycarsPage implements OnInit {

  constructor(      private navCtrl: NavController    ) { }

  ngOnInit() {
  }
 
  back(){
    this.navCtrl.navigateBack("/");
  }
}
