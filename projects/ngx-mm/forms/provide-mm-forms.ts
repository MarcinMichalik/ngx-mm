import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {MM_FORMS_CONFIG, MM_FORMS_DEFAULT_CONFIG, MMFormsConfig, MMProvidersToken} from './configs/mm-config';
import {MMDefaultErrorMessageResolver, MMErrorMessageResolver} from './services/mm-error-message-resolver.service';

export function provideMMForms(config: MMFormsConfig, provider: MMProvidersToken): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: MM_FORMS_CONFIG,
      useValue: {
        ...MM_FORMS_DEFAULT_CONFIG,
        ...config
      },
    },
    {
      provide: MMErrorMessageResolver,
      useClass: provider.errorMessageResolver || MMDefaultErrorMessageResolver
    }
  ]);
}
