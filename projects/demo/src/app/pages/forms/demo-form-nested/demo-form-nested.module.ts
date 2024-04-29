import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MMFormsModule} from 'ngx-mm/forms';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {DemoNestedFormsComponent} from './demo-nested-forms/demo-nested-forms.component';


@NgModule({
  declarations: [
    DemoNestedFormsComponent
  ],
  exports: [
    DemoNestedFormsComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    MMFormsModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  providers: [

  ]
})
export class DemoFormNestedModule { }
