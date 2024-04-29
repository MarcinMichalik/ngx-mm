import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MM_FORMS_CONFIG, MMErrorMessageResolver, MMFormsModule} from 'ngx-mm/forms';
import {InputTextModule} from 'primeng/inputtext';
import {TagModule} from 'primeng/tag';
import {TooltipModule} from 'primeng/tooltip';
import {CodeModule} from '../../shared/code/code.module';
import {DemoFormNestedModule} from './demo-form-nested/demo-form-nested.module';
import {FormsRoutingModule} from './forms-routing.module';
import {FormsComponent} from './forms.component';

@NgModule({
  declarations: [
    FormsComponent
  ],
  imports: [
    FormsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    MMFormsModule,
    DemoFormNestedModule,
    CodeModule,
    FormsModule,
    TagModule,
    TooltipModule,
  ],
  exports: [],
  providers: [
  ],
})
export class DemoFormsModule {

}
