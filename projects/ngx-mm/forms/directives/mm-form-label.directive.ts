import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mmFormLabel]'
})
export class MMFormLabelDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
