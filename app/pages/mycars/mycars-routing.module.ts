import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MycarsPage } from './mycars.page';

const routes: Routes = [
  {
    path: '',
    component: MycarsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MycarsPageRoutingModule {}
