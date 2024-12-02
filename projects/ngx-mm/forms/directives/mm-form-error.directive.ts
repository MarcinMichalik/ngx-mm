import {Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: '[mmFormError]',
    standalone: false
})
export class MMFormErrorDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
