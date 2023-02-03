import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  styleUrls: ['./add-car.page.scss'],
})
export class AddCarPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  back(){
    this.navCtrl.navigateBack("/");

  }
}
