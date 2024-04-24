import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mmFormLabel]',
  standalone: true
})
export class FormLabelDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
