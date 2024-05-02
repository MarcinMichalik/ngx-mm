import {InjectionToken, Type} from '@angular/core';
import {MMErrorMessageResolver} from '../services/mm-error-message-resolver.service';

export interface MMFormsConfig {
  // Field
  fieldClass?: string;
  style?: string;
  reverseLabelControl?: boolean;

  // Label
  labelClass?: string;
  labelStyle?: string;

  // Helper
  helperClass?: string;
  helperStyle?: string;

  // Error
  errorClass?: string;
  errorStyle?: string;

  // Mandatory
  mandatoryClass?: string;
  mandatoryStyle?: string;
  mandatorySymbol?: string;
  showMandatory?: boolean;

  // Validation
  invalidOnTouch?: boolean;
  invalidOnDirty?: boolean;
}

export const MM_FORMS_CONFIG = new InjectionToken<MMFormsConfig>("MM_FORMS_CONFIG");

export interface MMProvidersToken {
  errorMessageResolver?: Type<MMErrorMessageResolver>;
}

export const MM_FORMS_DEFAULT_CONFIG: MMFormsConfig = {
  fieldClass: 'field',
  style: '',
  reverseLabelControl: false,
  labelClass: '',
  labelStyle: '',
  helperClass: '',
  helperStyle: '',
  errorClass: '',
  errorStyle: '',
  mandatoryClass: '',
  mandatorySymbol: '*',
  showMandatory: true,
  invalidOnTouch: true,
  invalidOnDirty: false
}
