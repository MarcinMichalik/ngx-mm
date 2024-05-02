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
import {MMFormMandatoryDirective} from './directives/mm-form-mandatory.directive';
import {MMErrorMessageResolver} from './services/mm-error-message-resolver.service';

const NOOP_VALUE_ACCESSOR: ControlValueAccessor = {
  writeValue(): void {},
  registerOnChange(): void {},
  registerOnTouched(): void {}
};

@Component({
  selector: 'mm-form-field',
  template: `
    <div [ngClass]="styleClass" [style]="style">
      <ng-template #label>
        <ng-container [ngTemplateOutlet]="formLabel?.templateRef || defaultLabelTemplate"
                      [ngTemplateOutletContext]="labelTemplateContext">
        </ng-container>
      </ng-template>
      <ng-template #control>
        <ng-container [ngTemplateOutlet]="formControl.templateRef"
                      [ngTemplateOutletContext]="{$implicit: ngControl?.control}">
        </ng-container>
      </ng-template>

      <!-- Standard order - LABEL -> CONTROL -->
      <ng-container *ngIf="!reverseLabelControl">
        <!-- LABEL -->
        <ng-container [ngTemplateOutlet]="label"></ng-container>
        <!-- CONTROL -->
        <ng-container [ngTemplateOutlet]="control"></ng-container>
      </ng-container>

      <!-- Revers order - CONTROL -> LABEL -->
      <ng-container *ngIf="reverseLabelControl">
        <!-- CONTROL -->
        <ng-container [ngTemplateOutlet]="control"></ng-container>
        <!-- LABEL -->
        <ng-container [ngTemplateOutlet]="label"></ng-container>
      </ng-container>

      <!-- Helpers -->
      <ng-container [ngTemplateOutlet]="formHelper?.templateRef || defaultHelperTemplate"
                    [ngTemplateOutletContext]="{$implicit: helper}">
      </ng-container>

      <!-- Errors -->
      <ng-container *ngFor="let error of (ngControl?.errors || {}) | keyvalue">
        <ng-container *ngIf="showError">
          <ng-container [ngTemplateOutlet]="formError?.templateRef || defaultErrorTemplate"
                        [ngTemplateOutletContext]="{
                          $implicit: errorMessageResolver.resolveErrorMessage(error.key, error.value, ngControl?.name),
                          key: error.key,
                          value: error.value,
                          controlName: ngControl?.name
                        }">
          </ng-container>
        </ng-container>
      </ng-container>
    </div>

    <!-- Default templates -->
    <ng-template #defaultLabelTemplate let-label
                 let-id="id"
                 let-mandatory="mandatory"
                 let-showMandatory="showMandatory"
                 let-mandatorySymbol="mandatorySymbol">
      <label [attr.for]="id" [ngClass]="labelClass" [style]="labelStyle">
        {{ label }}
        <ng-container [ngTemplateOutlet]="formMandatory?.templateRef || defaultMandatoryTemplate"
                      [ngTemplateOutletContext]="{$implicit: mandatory, showMandatory, mandatorySymbol}">
        </ng-container>
      </label>
    </ng-template>
    <ng-template #defaultMandatoryTemplate
                 let-mandatory
                 let-showMandatory="showMandatory"
                 let-mandatorySymbol="mandatorySymbol">
        <span [style]="mandatoryStyle" [ngClass]="mandatoryClass" *ngIf="mandatory && showMandatory">
          {{ mandatorySymbol }}
        </span>
    </ng-template>
    <ng-template #defaultHelperTemplate let-helper>
      <small [ngClass]="helperClass" [style]="helperStyle">
        {{helper}}
      </small>
    </ng-template>
    <ng-template #defaultErrorTemplate let-error>
      <small [ngClass]="errorClass" [style]="errorStyle">
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

  // Inputs
  @Input('label') label?: string;
  @Input('id') id?: string = this.ngControl?.name as string;
  @Input('helper') helper?: string;
  @Input('invalidOnTouch') invalidOnTouch: boolean = this.mmFormsConfig.invalidOnTouch!;
  @Input('invalidOnDirty') invalidOnDirty: boolean = this.mmFormsConfig.invalidOnDirty!;
  @Input('reverseLabelControl') reverseLabelControl: boolean = this.mmFormsConfig.reverseLabelControl!;

  // Inputs customizations
  // General
  @Input('style') style?: string = this.mmFormsConfig.style;
  @Input('styleClass') styleClass?: string = this.mmFormsConfig.fieldClass || '';

  // Label
  @Input('labelStyle') labelStyle?: string = this.mmFormsConfig.labelStyle;
  @Input('labelClass') labelClass?: string = this.mmFormsConfig.labelClass;

  // Helper
  @Input('helperStyle') helperStyle?: string = this.mmFormsConfig.helperStyle;
  @Input('helperClass') helperClass?: string = this.mmFormsConfig.helperClass;

  // Error
  @Input('errorStyle') errorStyle?: string = this.mmFormsConfig.errorStyle;
  @Input('errorClass') errorClass?: string = this.mmFormsConfig.errorClass;

  // Mandatory
  @Input('mandatorySymbol') mandatorySymbol?: string = this.mmFormsConfig.mandatorySymbol;
  @Input('mandatoryStyle') mandatoryStyle?: string = this.mmFormsConfig.mandatoryStyle;
  @Input('mandatoryClass') mandatoryClass?: string = this.mmFormsConfig.mandatoryClass;
  @Input('showMandatory') showMandatory?: boolean = this.mmFormsConfig.showMandatory!;

  // Content query
  @ContentChild(MMFormControlDirective) formControl!: MMFormControlDirective;
  @ContentChild(MMFormLabelDirective) formLabel!: MMFormLabelDirective;
  @ContentChild(MMFormHelperDirective) formHelper!: MMFormHelperDirective;
  @ContentChild(MMFormErrorDirective) formError!: MMFormErrorDirective;
  @ContentChild(MMFormMandatoryDirective) formMandatory!: MMFormMandatoryDirective;


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

  get showError() {
    return (this.ngControl?.invalid && !this.invalidOnTouch && !this.invalidOnDirty)
      || (this.ngControl?.invalid && (this.invalidOnTouch && this.ngControl?.touched))
      || (this.ngControl?.invalid && (this.invalidOnDirty && this.ngControl?.dirty))
  }

  get labelTemplateContext() {
    return {
      $implicit: this.label,
      id: this.id || this.ngControl?.name,
      mandatory: this.isMandatory,
      showMandatory: this.showMandatory,
      mandatorySymbol: this.mandatorySymbol
    };
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  writeValue(obj: any): void {}
}
