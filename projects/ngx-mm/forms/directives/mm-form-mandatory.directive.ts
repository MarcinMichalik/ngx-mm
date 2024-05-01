import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mmFormMandatory]'
})
export class MMFormMandatoryDirective {

  constructor(public templateRef: TemplateRef<unknown>) {
  }

}
