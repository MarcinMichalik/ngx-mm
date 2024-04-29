import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mmMmFormError]'
})
export class MMFormErrorDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
