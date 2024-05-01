import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mmFormHelper]'
})
export class MMFormHelperDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
