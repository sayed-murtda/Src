import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//translate
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Storage
import { IonicStorageModule } from '@ionic/storage-angular';

//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB-wPdcPXuM-BQ1togBFO5fGT9N76iny60",
  authDomain: "cars-ad60a.firebaseapp.com",
  projectId: "cars-ad60a",
  storageBucket: "cars-ad60a.appspot.com",
  messagingSenderId: "972563778922",
  appId: "1:972563778922:web:2e6284663003fefb956913",
  measurementId: "G-LDYZZFBBWC"
};
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
  
}


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    //firebase 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    // translate
    IonicStorageModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
