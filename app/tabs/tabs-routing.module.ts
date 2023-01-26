import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'cars',
        loadChildren: () => import('../pages/cars/cars.module').then( m => m.CarsPageModule)
      },
      {
        path: 'our-services',
        loadChildren: () => import('../pages/our-services/our-services.module').then( m => m.OurServicesPageModule)
      },
      {
      path: 'showrooms',
        loadChildren: () => import('../pages/all-services/showrooms/showrooms.module').then( m => m.ShowroomsPageModule)
      },
      {
        path: 'flatcars',
        loadChildren: () => import('../pages/all-services//flatcars/flatcars.module').then( m => m.FlatcarsPageModule)
      },
      {
        path: 'cars',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/cars',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
