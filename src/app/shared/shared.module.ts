import { NgModule } from '@angular/core';
import { UilitiesModule } from './modules/utilities.module';
import { AngularMaterialModule } from './modules/angular-material.module';
import { NoContentComponent } from './components/no-content/no-content.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NoContentComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [
    CommonModule,
    AngularMaterialModule,
    UilitiesModule,
    NoContentComponent,
  ],
})
export class SharedModule {}
