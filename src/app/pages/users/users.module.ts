import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainUserComponent } from './main-user/main-user.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: MainUserComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
];

@NgModule({
  declarations: [MainUserComponent, FormComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class UsersModule {}
