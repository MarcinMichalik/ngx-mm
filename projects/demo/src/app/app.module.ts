import {Injectable, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MMErrorMessageResolver, MMFormsModule} from 'ngx-mm/forms';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

export class CustomMessageResolver implements MMErrorMessageResolver {
  resolveErrorMessage(key: string, value?: any, formControlName?: string | number | null): string {
    switch (key) {
      case 'required':
        return 'This field is required';
      case 'minlength':
        return `The min length of ${value.requiredLength} characters is not reached, you typed in ${value.actualLength} characters`;
      case 'maxlength':
        return `The max length of ${value.requiredLength} characters is reached, you typed in ${value.actualLength} characters`;
      default:
        return 'This field is invalid'
    }
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
      fieldClass: 'field',
      errorClass: 'text-red-900',
      showMandatory: true,
      mandatorySymbol: '#',
      invalidOnTouch: true,
      invalidOnDirty: false,
    }, {
      errorMessageResolver: CustomMessageResolver
    }),
    ReactiveFormsModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
