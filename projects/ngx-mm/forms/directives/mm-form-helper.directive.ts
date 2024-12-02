import {Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: '[mmFormHelper]',
    standalone: false
})
export class MMFormHelperDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
