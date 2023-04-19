import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  selectTab: any;
  @ViewChild('tabs') tabs: any;

  
  constructor(private router:Router,
    public lanSrv:LanguageService) { }

  ngOnInit() {
  }

  setCurrentTab(event:any) {
    this.selectTab = this.tabs.getSelected();
  }

  onClick(){
    this.router.navigateByUrl('/add-car')
  }

  singin(){
    this.router.navigateByUrl('/signinup')
  }

  admin(){
    this.router.navigateByUrl('/a-home')


  }

}
