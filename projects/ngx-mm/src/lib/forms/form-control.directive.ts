import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mmFormControl]',
  standalone: true
})
export class FormControlDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
