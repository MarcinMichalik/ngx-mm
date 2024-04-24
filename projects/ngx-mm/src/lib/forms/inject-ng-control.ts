import {inject} from '@angular/core';
import {FormControlDirective, FormControlName, NgControl, NgModel} from '@angular/forms';

export function injectNgControl() {
  const ngControl = inject(NgControl, { self: true, optional: true });

  // TODO - add error
  if (!ngControl) {
    throw new Error('...');
  }

  if (ngControl instanceof FormControlDirective || ngControl instanceof FormControlName || ngControl instanceof NgModel) {
    return ngControl;
  }

  // TODO - add error
  throw new Error('...');
}
