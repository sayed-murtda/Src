import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signinup',
  templateUrl: './signinup.page.html',
  styleUrls: ['./signinup.page.scss'],
})
export class SigninupPage implements OnInit {
sign="signin";
email='';
password='';
  constructor() { }

  ngOnInit() {
  }

}
