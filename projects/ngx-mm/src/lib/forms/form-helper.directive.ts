import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mmFormHelper]',
  standalone: true
})
export class FormHelperDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
