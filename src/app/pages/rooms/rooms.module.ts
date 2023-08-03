import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormRoomComponent } from './form-room/form-room.component';
import { RoomsComponent } from './main-room/main-rooms.component';

const routes: Routes = [
  { path: '', component: RoomsComponent },
  { path: 'form', component: FormRoomComponent },
];

@NgModule({
  declarations: [RoomsComponent, FormRoomComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
})
export class RoomsModule {}
