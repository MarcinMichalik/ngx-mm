import {Injectable} from '@angular/core';
import {Route} from '@angular/router';
import { MMErrorMessageResolver, MM_FORMS_CONFIG } from 'ngx-mm';

@Injectable()
class MyErrorResolver implements MMErrorMessageResolver {
  resolveErrorMessage(key: string, value?: any, formControlName?: string | number | null): string {
    return 'To nie tak xxx';
  }
}

export const FORMS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./forms.component').then(({FormsComponent}) => FormsComponent),
    providers: [
      {
        provide: MM_FORMS_CONFIG,
        useValue: {
          fieldClass: 'text-blue-500'
        }
      },
      MyErrorResolver,
      {
        provide: MMErrorMessageResolver,
        useClass: MyErrorResolver
      }
    ]
  }
] as Route[];
