import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormHotelComponent } from './form-hotel/form-hotel.component';
import { HotelsComponent } from './main-hotel/hotels.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: HotelsComponent },
  { path: 'form', component: FormHotelComponent },
];

@NgModule({
  declarations: [HotelsComponent, FormHotelComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [],
})
export class HotelsModule {}
