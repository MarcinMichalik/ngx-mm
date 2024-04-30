import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mmMmFormMandatory]'
})
export class MMFormMandatoryDirective {

  constructor(public templateRef: TemplateRef<unknown>) {
  }

}
