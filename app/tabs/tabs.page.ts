import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  selectTab: any;
  @ViewChild('tabs') tabs: any;

  
  constructor(private router:Router) { }

  ngOnInit() {
  }

  setCurrentTab(event:any) {
    this.selectTab = this.tabs.getSelected();
  }

  onClick(){
    this.router.navigateByUrl('/add-car')
  }
}
