import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-headerpage',
  templateUrl: './headerpage.component.html',
  styleUrls: ['./headerpage.component.scss'],
})
export class HeaderpageComponent implements OnInit {
  @Input() title:string='';
  @Input() logout:boolean=false;
  testlogout=true;
  constructor(public route: Router,public menuCtrl: MenuController) { 
   
  }

  ngOnInit(): void {
       
    
  }

  LOGOUT(){
    // this.menuCtrl.enable(false);
    // this.route.navigateByUrl('/signin');

  }

}
