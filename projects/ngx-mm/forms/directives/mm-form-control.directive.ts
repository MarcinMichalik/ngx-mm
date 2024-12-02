import {Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: '[mmFormControl]',
    standalone: false
})
export class MMFormControlDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
