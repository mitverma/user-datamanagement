import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerInfoRoutingModule } from './customer-info-routing.module';
import { CustomerInfoComponent } from './customer-info.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    CustomerInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomerInfoRoutingModule
  ]
})
export class CustomerInfoModule { }
