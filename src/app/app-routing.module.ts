import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(mod => mod.LoginModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(mod => mod.DashboardModule),
  },
  {
    path: 'customerentry',
    loadChildren: () => import('./modules/customer-detail/customer-detail.module').then(mod => mod.CustomerDetailModule),
  },
  {
    path: 'customerinfo',
    loadChildren: () => import('./modules/customer-info/customer-info.module').then(mod => mod.CustomerInfoModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
