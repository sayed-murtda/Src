import { Component, OnInit } from '@angular/core'; 
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.page.html',
  styleUrls: ['./view-detail.page.scss'],
})
export class ViewDetailPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  go(){
    this.navCtrl.navigateBack("/");

  }

  

}
