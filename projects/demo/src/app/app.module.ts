import { provideHttpClient, withInterceptorsFromDi, withFetch } from "@angular/common/http";
import { NgDocRootComponent, NgDocNavbarComponent, NgDocSidebarComponent, provideNgDocApp, provideSearchEngine, NgDocDefaultSearchEngine, providePageSkeleton, NG_DOC_DEFAULT_PAGE_SKELETON, provideMainPageProcessor, NG_DOC_DEFAULT_PAGE_PROCESSORS } from "@ng-doc/app";
import { NG_DOC_ROUTING, provideNgDocContext } from "@ng-doc/generated";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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
      BrowserAnimationsModule,
      RouterModule.forRoot(NG_DOC_ROUTING, {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', scrollOffset: [0, 70]}),
      NgDocRootComponent,
      NgDocNavbarComponent,
      NgDocSidebarComponent
],
  providers: [
      provideHttpClient(withInterceptorsFromDi(), withFetch()),
      provideNgDocContext(),
      provideNgDocApp(),
      provideSearchEngine(NgDocDefaultSearchEngine),
      providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON),
      provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS)
],
  bootstrap: [AppComponent]
})
export class AppModule { }
