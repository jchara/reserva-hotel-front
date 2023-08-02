import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularMaterialModule } from 'src/app/shared/modules/material/angular-material.module';
import { FormRoomComponent } from './form-room/form-room.component';
import { RoomsComponent } from './main-room/rooms.component';
import { UilitiesModule } from 'src/app/shared/modules/utilities/utilities.module';

const routes: Routes = [
  { path: '', component: RoomsComponent },
  { path: 'form', component: FormRoomComponent },
];

@NgModule({
  declarations: [RoomsComponent, FormRoomComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    UilitiesModule
  ],
})
export class RoomsModule {}
