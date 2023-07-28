import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: RoomsComponent }];

@NgModule({
  declarations: [RoomsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RoomsModule {}
