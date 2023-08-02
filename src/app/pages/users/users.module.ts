import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainUserComponent } from './main-user/main-user.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MainUserComponent,
  },
];

@NgModule({
  declarations: [MainUserComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class UsersModule {}
