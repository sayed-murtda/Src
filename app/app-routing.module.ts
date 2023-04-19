import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'view-detail',
    loadChildren: () => import('./pages/view-detail/view-detail.module').then( m => m.ViewDetailPageModule)
  },
  {
    path: 'add-car',
    loadChildren: () => import('./pages/add-car/add-car.module').then( m => m.AddCarPageModule)
  },
  {
    path: 'signinup',
    loadChildren: () => import('./pages/signinup/signinup.module').then( m => m.SigninupPageModule)
  },
  {
    path: 'add-showroom',
    loadChildren: () => import('./pages/add-showroom/add-showroom.module').then( m => m.AddShowroomPageModule)
  },
  {
    path: 'a-home',
    loadChildren: () => import('./admin/a-home/a-home.module').then( m => m.AHomePageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },










];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
