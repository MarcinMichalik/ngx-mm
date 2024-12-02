import {Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: '[mmFormMandatory]',
    standalone: false
})
export class MMFormMandatoryDirective {

  constructor(public templateRef: TemplateRef<unknown>) {
  }

}
