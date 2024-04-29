import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MM_FORMS_CONFIG, MMErrorMessageResolver, MMFormsModule} from 'ngx-mm/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

class MyErrorResolver implements MMErrorMessageResolver {
  resolveErrorMessage(key: string, value?: any, formControlName?: string | number | null): string {
    return 'To nie tak';
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MMFormsModule.forRoot({
      fieldClass: 'text-green-900'
    }, {
      // errorMessageResolver: MyErrorResolver
    }),
  ],
  providers: [
    {
      provide: MM_FORMS_CONFIG,
      useValue: {
        fieldClass: 'text-blue-500 col-6'
      }
    },
    {
      provide: MMErrorMessageResolver,
      useClass: MyErrorResolver
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
