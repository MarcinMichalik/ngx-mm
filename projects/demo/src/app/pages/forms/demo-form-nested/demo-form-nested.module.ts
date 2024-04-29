import {Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MMFormsModule} from 'ngx-mm';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {MM_FORMS_CONFIG} from '../../../../../../ngx-mm/src/lib/forms/configs/mm-config';
import {
  MMErrorMessageResolver
} from '../../../../../../ngx-mm/src/lib/forms/services/mm-error-message-resolver.service';
import { DemoNestedFormsComponent } from './demo-nested-forms/demo-nested-forms.component';

@Injectable()
class MyCustomErrorResolver implements MMErrorMessageResolver {
  resolveErrorMessage(key: string, value?: any, formControlName?: string | number | null): string {
    return 'To nie tak w tym komponencie';
  }
}

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
    {
      provide: MMErrorMessageResolver,
      useClass: MyCustomErrorResolver,
      multi: true
    },
    {
      provide: MM_FORMS_CONFIG,
      useValue: {
        fieldClass: 'text-red-500'
      }
    }
  ]
})
export class DemoFormNestedModule { }
