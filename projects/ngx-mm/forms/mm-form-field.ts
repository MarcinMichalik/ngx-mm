import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Inject,
  Input,
  Optional,
  Self,
  ViewEncapsulation
} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NgControl} from '@angular/forms';
import {MM_FORMS_CONFIG, MMFormsConfig} from './configs/mm-config';
import {MMFormControlDirective} from './directives/mm-form-control.directive';
import {MMFormErrorDirective} from './directives/mm-form-error.directive';
import {MMFormHelperDirective} from './directives/mm-form-helper.directive';
import {MMFormLabelDirective} from './directives/mm-form-label.directive';
import {MMErrorMessageResolver} from './services/mm-error-message-resolver.service';

const NOOP_VALUE_ACCESSOR: ControlValueAccessor = {
  writeValue(): void {},
  registerOnChange(): void {},
  registerOnTouched(): void {}
};

@Component({
  selector: 'mm-form-field',
  template: `
    <div [class]="styleClass" [style]="style">
      <!-- Standard order - LABEL -> CONTROL -->
      <ng-container *ngIf="!reverseLabelControl">
        <!-- LABEL -->
        <ng-container [ngTemplateOutlet]="formLabel?.templateRef || defaultLabelTemplate"
                      [ngTemplateOutletContext]="{$implicit: label, id: id || ngControl?.name, mandatory: isMandatory}">
        </ng-container>

        <!-- CONTROL -->
        <ng-container [ngTemplateOutlet]="formControl.templateRef"
                      [ngTemplateOutletContext]="{$implicit: ngControl?.control}">
        </ng-container>
      </ng-container>

      <!-- Revers order - CONTROL -> LABEL -->
      <ng-container *ngIf="reverseLabelControl">
        <!-- CONTROL -->
        <ng-container [ngTemplateOutlet]="formControl.templateRef"
                      [ngTemplateOutletContext]="{$implicit: ngControl?.control}">
        </ng-container>

        <!-- LABEL -->
        <ng-container [ngTemplateOutlet]="formLabel?.templateRef || defaultLabelTemplate"
                      [ngTemplateOutletContext]="{$implicit: label, id: id || ngControl?.name, mandatory: isMandatory}">
        </ng-container>
      </ng-container>

      <!-- Helpers -->
      <ng-container [ngTemplateOutlet]="formHelper?.templateRef || defaultLabelTemplate"
                    [ngTemplateOutletContext]="{$implicit: helper}">
      </ng-container>

      <!-- Errors -->
      <ng-container *ngFor="let error of (ngControl?.errors || {}) | keyvalue">
        <ng-container
          *ngIf="(ngControl?.invalid && !invalidOnTouch && !invalidOnDirty)
          || (ngControl?.invalid && (invalidOnTouch && ngControl?.touched))
          || (ngControl?.invalid && (invalidOnDirty && ngControl?.dirty))">
          <ng-container [ngTemplateOutlet]="formError?.templateRef || defaultErrorTemplate"
                        [ngTemplateOutletContext]="{$implicit: errorMessageResolver.resolveErrorMessage(error.key, error.value, ngControl?.name)}">
          </ng-container>
        </ng-container>
      </ng-container>
    </div>

    <!-- Default templates -->
    <ng-template #defaultLabelTemplate let-label let-id="id" let-mandatory="mandatory">
      <label [attr.for]="id" [class]="labelStyleClass || mmFormsConfig.labelClass" [style]="labelStyle">
        {{ label }}
        <span [style]="mandatoryStyle" *ngIf="mandatory && showMandatory">
          {{ mandatorySymbol }}
        </span>
      </label>
    </ng-template>
    <ng-template #defaultHelperTemplate>
      <small [class]="mmFormsConfig.helperClass"></small>
    </ng-template>
    <ng-template #defaultErrorTemplate let-error>
      <small [class]="mmFormsConfig.errorClass">
        {{ error }}
      </small>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MMFormField implements ControlValueAccessor {
  // Angular v15 - standalone is stable!!!!
  // https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55

  // TODO - HTML arias
  // TODO - add separate component form radio/checkbox??? Maybe reverse label and control will be enough

  // Inputs
  @Input('label') label?: string;
  @Input('id') id?: string;
  @Input('helper') helper?: string;
  @Input('invalidOnTouch') invalidOnTouch: boolean = this.mmFormsConfig.invalidOnTouch || true;
  @Input('invalidOnDirty') invalidOnDirty: boolean = this.mmFormsConfig.invalidOnDirty || true;
  @Input('reverseLabelControl') reverseLabelControl: boolean = this.mmFormsConfig.reverseLabelControl || false;

  // Inputs customizations
  // General
  @Input('style') style?: string = this.mmFormsConfig.style;
  @Input('styleClass') styleClass?: string = this.mmFormsConfig.fieldClass || '';

  // Label
  @Input('labelStyle') labelStyle?: string = this.mmFormsConfig.labelStyle;
  @Input('labelStyleClass') labelStyleClass?: string = this.mmFormsConfig.labelStyle;
  // Helper
  @Input('helperStyle') helperStyle?: string = this.mmFormsConfig.helperStyle;
  @Input('helperStyleClass') helperStyleClass?: string = this.mmFormsConfig.helperClass;

  // Error
  @Input('errorStyle') errorStyle?: string = this.mmFormsConfig.errorStyle;
  @Input('errorStyleClass') errorStyleClass?: string = this.mmFormsConfig.errorClass;

  // Mandatory
  // TODO - move to default configuration
  @Input('mandatorySymbol') mandatorySymbol?: string = this.mmFormsConfig.mandatorySymbol || '*';
  @Input('mandatoryStyle') mandatoryStyle?: string = this.mmFormsConfig.mandatoryStyle || 'color: red;font-weight: bold;margin-left: 3px;font-size: 1.2em;';
  @Input('showMandatory') showMandatory?: boolean = this.mmFormsConfig.showMandatory || true;

  // Content query
  @ContentChild(MMFormControlDirective) formControl!: MMFormControlDirective;
  @ContentChild(MMFormLabelDirective) formLabel!: MMFormLabelDirective;
  @ContentChild(MMFormHelperDirective) formHelper!: MMFormHelperDirective;
  @ContentChild(MMFormErrorDirective) formError!: MMFormErrorDirective;


  // Before 15 - https://stackoverflow.com/questions/53099559/passing-a-formcontrol-to-a-child-component-no-value-accessor-for-form-control
  constructor(@Self() @Optional() public ngControl: NgControl,
              protected readonly errorMessageResolver: MMErrorMessageResolver,
              @Inject(MM_FORMS_CONFIG) protected readonly mmFormsConfig: MMFormsConfig) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = NOOP_VALUE_ACCESSOR;
    }
  }

  get isMandatory() {
    const validator = this.ngControl?.control?.validator?.({} as AbstractControl);
    return (validator && validator?.['required']);
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

}
