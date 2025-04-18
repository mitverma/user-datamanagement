import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDetailRoutingModule } from './customer-detail-routing.module';
import { CustomerDetailComponent } from './customer-detail.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    CustomerDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomerDetailRoutingModule
  ]
})
export class CustomerDetailModule { }
