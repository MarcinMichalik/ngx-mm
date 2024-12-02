import {Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: '[mmFormLabel]',
    standalone: false
})
export class MMFormLabelDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
