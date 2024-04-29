import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mmMmFormLabel]'
})
export class MMFormLabelDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
