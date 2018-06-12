import { ReactiveFormsModule } from '@angular/forms';
import { ScrollToMeDirective } from './scroll-to-me';
import { BetterCoreModule } from 'iwe7-better-scroll';
import { Iwe7NavbarModule } from 'iwe7-navbar';
import { Iwe7LayoutModule } from 'iwe7-layout';
import { CarTypeSelectComponent } from './car-type-select/car-type-select';
import { CarBrandSelectComponent } from './car-brand-select/car-brand-select';
import { NgForEndDirective } from './ng-for-end';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CarBrandComponent } from './car-brand/car-brand';
import { NgModule } from '@angular/core';
import { Iwe7IndexListModule } from 'iwe7-index-list';
@NgModule({
  imports: [
    Iwe7IndexListModule,
    CommonModule,
    HttpClientModule,
    Iwe7LayoutModule,
    Iwe7NavbarModule,
    BetterCoreModule,
    ReactiveFormsModule
  ],
  declarations: [
    CarBrandComponent,
    NgForEndDirective,
    CarBrandSelectComponent,
    CarTypeSelectComponent,
    ScrollToMeDirective
  ],
  exports: [
    CarBrandComponent,
    NgForEndDirective,
    CarBrandSelectComponent,
    CarTypeSelectComponent,
    ScrollToMeDirective
  ],
  entryComponents: [
    CarBrandSelectComponent,
    CarTypeSelectComponent
  ]
})
export class Iwe7CarBrandModule { }
