import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {MM_FORMS_CONFIG, MMFormsConfig, MMProvidersToken} from './configs/mm-config';
import {MMFormControlDirective} from './directives/mm-form-control.directive';
import {MMFormErrorDirective} from './directives/mm-form-error.directive';
import {MMFormHelperDirective} from './directives/mm-form-helper.directive';
import {MMFormLabelDirective} from './directives/mm-form-label.directive';
import {MMFormMandatoryDirective} from './directives/mm-form-mandatory.directive';
import {MMFormField} from './mm-form-field';
import {MMDefaultErrorMessageResolver, MMErrorMessageResolver} from './services/mm-error-message-resolver.service';


@NgModule({
  declarations: [
    MMFormField,
    MMFormControlDirective,
    MMFormLabelDirective,
    MMFormHelperDirective,
    MMFormErrorDirective,
    MMFormMandatoryDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MMFormField,
    MMFormControlDirective,
    MMFormLabelDirective,
    MMFormHelperDirective,
    MMFormErrorDirective,
    MMFormMandatoryDirective
  ],
})
export class MMFormsModule {

  public static forRoot(config: MMFormsConfig, provider: MMProvidersToken): ModuleWithProviders<MMFormsModule> {
    return {
      ngModule: MMFormsModule,
      providers: [
        {
          provide: MM_FORMS_CONFIG,
          useValue: config,
        },
        {
          provide: MMErrorMessageResolver,
          useClass: provider.errorMessageResolver || MMDefaultErrorMessageResolver
        }
      ]
    }
  }

}
