import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mmFormError]'
})
export class MMFormErrorDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
