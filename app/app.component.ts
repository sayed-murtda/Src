import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LanguageService } from './language.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // side:any='start';
  // check_ar:any=false;
  // check_en:any=true;
  // darkMode=true;
  // moon='sunny-outline';
  
  constructor(public lang:LanguageService,public menuCtrl: MenuController) {

   lang.setIntLa().then(res => console.log(res));
  }
  handleChange(lng:any) {
    this.menuCtrl.close().then(()=>{
      this.lang.set(lng)
    }
    ) 
  }

  ar(){
    this.handleChange('ar');
  }
  en(){
    this.handleChange('en');

  }

  dark(){
    this.lang.setdark();
  }


}
