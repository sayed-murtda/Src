import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AHomePage } from './a-home.page';

const routes: Routes = [
  {
    path: '',
    component: AHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AHomePageRoutingModule {}
