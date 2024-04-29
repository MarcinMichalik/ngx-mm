import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mmFormControl]'
})
export class MMFormControlDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
