import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  select:any='';
  darkMode=true;
  moon='sunny-outline';
  check_ar:any=false;
  check_en:any=true;
  signin=false;
  user:any={};
  constructor(private translate:TranslateService,private storage: Storage) { 
    this.init();
    this.getUser();
  }

  async init(){
    const storage = await this.storage.create();
    this.storage = storage;
  }
 
  async setIntLa(){
     this.storage.get('language').then((res)=>{
      if(res)
      this.set(res);
      else
      this.translate.setDefaultLang('en');
   
    }).catch(()=>{
      this.translate.setDefaultLang('en');
      return false;
    });

    this.dark();
  }

  set(lng:any){
    this.storage.set('language',lng);
    this.translate.use(lng);
    if(lng=='en'){
      document.getElementsByTagName('body')[0].style.direction='ltr';
      this.check_ar=false;
      this.check_en=true;
    }
    else{
      document.getElementsByTagName('body')[0].style.direction='rtl';
      this.check_ar=true;
      this.check_en=false;
    }
  }

  dark(){
    this.storage.get('darkMode').then((res)=>{
      this.darkMode=!res;
      this.setdark();
    })

  
  }

   setdark(){
    this.darkMode=!this.darkMode;
    if(!this.darkMode){
      document.body.setAttribute('color-theme','dark');
      this.moon='moon-outline';

    }else{
      document.body.setAttribute('color-theme','light');
      this.moon='sunny-outline';
    }
    this.storage.set('darkMode',this.darkMode);
  }

  setUser(user:any){
    this.storage.set('user',JSON.stringify(user));
    this.signin=true;
    this.user=user;
  }

  getUser(){
    this.storage.get('user').then((res)=>{
      if(res){
        this.user=JSON.parse(res);
        this.signin=true;
        console.log(JSON.parse(res));
      }
    });
  }

  out(){
    this.signin=false;
    this.storage.remove('user');
  }


  

}
