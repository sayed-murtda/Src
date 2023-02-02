import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.page.html',
  styleUrls: ['./view-detail.page.scss'],
})
export class ViewDetailPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  go(){
    this.router.navigateByUrl('/')
  }

  

}
