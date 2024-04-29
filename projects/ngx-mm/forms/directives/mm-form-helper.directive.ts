import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mmMmFormHelper]'
})
export class MMFormHelperDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
