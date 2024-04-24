import {Component, ContentChild, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractControl} from '@angular/forms';
import {FormControlDirective} from '../form-control.directive';
import {FormHelperDirective} from '../form-helper.directive';
import {FormLabelDirective} from '../form-label.directive';
import {injectNgControl} from '../inject-ng-control';

@Component({
  selector: 'mm-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent {
  protected readonly ngControl = injectNgControl();

  @Input('label') label?: string;

  @ContentChild(FormControlDirective) formControl!: FormControlDirective;
  @ContentChild(FormLabelDirective) formLabel!: FormLabelDirective;
  @ContentChild(FormHelperDirective) formHelper!: FormHelperDirective;

  get isMandatory() {
    const validator = this.ngControl?.control?.validator?.({} as AbstractControl);
    return (validator && validator?.['required']);
  }

}
