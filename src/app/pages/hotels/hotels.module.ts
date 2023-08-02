import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularMaterialModule } from 'src/app/shared/modules/material/angular-material.module';
import { FormHotelComponent } from './form-hotel/form-hotel.component';
import { HotelsComponent } from './main-hotel/hotels.component';
import { UilitiesModule } from 'src/app/shared/modules/utilities/utilities.module';

const routes: Routes = [
  { path: '', component: HotelsComponent },
  { path: 'form', component: FormHotelComponent },
];

@NgModule({
  declarations: [HotelsComponent, FormHotelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    UilitiesModule
  ],
  exports: [],
})
export class HotelsModule {}
