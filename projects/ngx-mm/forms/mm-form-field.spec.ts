import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {MM_FORMS_CONFIG, MMFormsConfig} from './configs/mm-config';
import {MMFormsModule} from './mm-forms.module';
import {MMDefaultErrorMessageResolver, MMErrorMessageResolver} from './services/mm-error-message-resolver.service';

@Component({
    template: `
    <form [formGroup]="formGroup">
      <mm-form-field formControlName="firstName" label="First name" helper="Your first name">
        <ng-template mmFormControl let-control>
          <input [formControl]="control">
        </ng-template>
      </mm-form-field>
    </form>
  `,
    standalone: false
})
class TestMMFormFieldComponent {

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      firstName: [{value: null, disabled: false}, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(5)
      ])],
    })
  }
}

@Component({
    template: `
    <form [formGroup]="formGroup">
      <mm-form-field formControlName="firstName"
                     [label]="label"
                     [id]="id"
                     [helper]="helper"
                     [invalidOnTouch]="invalidOnTouch"
                     [invalidOnDirty]="invalidOnDirty"
                     [reverseLabelControl]="reverseLabelControl"
                     [style]="style"
                     [styleClass]="styleClass"
                     [labelStyle]="labelStyle"
                     [labelClass]="labelClass"
                     [helperStyle]="helperStyle"
                     [helperClass]="helperClass"
                     [errorStyle]="errorStyle"
                     [errorClass]="errorClass"
                     [mandatorySymbol]="mandatorySymbol"
                     [mandatoryStyle]="mandatoryStyle"
                     [mandatoryClass]="mandatoryClass"
                     [showMandatory]="showMandatory">
        <ng-template mmFormControl let-control>
          <input [formControl]="control">
        </ng-template>
      </mm-form-field>
    </form>
  `,
    standalone: false
})
class InputTestMMFormFieldComponent {

  public formGroup: FormGroup;
  public label = 'my-label';
  public id = 'custom-id';
  public helper = 'my-helper'
  public invalidOnTouch = true;
  public invalidOnDirty = false;
  public reverseLabelControl = false;

  // Inputs customizations
  // General
  public style = 'border: 1px solid;';
  public styleClass = 'my-field-class';

  // Label
  public labelStyle = 'color: blue;';
  public labelClass = 'my-label-class';

  // Helper
  public helperStyle = 'color: green;'
  public helperClass = 'my-helper-class';

  // Error
  public errorStyle = 'color: red;'
  public errorClass = 'my-error-class'

  // Mandatory
  public mandatorySymbol = '&'
  public mandatoryStyle = 'color: red;';
  public mandatoryClass = 'my-mandatory-class'
  public showMandatory = true;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      firstName: [{value: null, disabled: false}, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(5)
      ])],
    })
  }
}

@Component({
    template: `
    <form [formGroup]="formGroup">
      <mm-form-field formControlName="firstName" label="MyLabel" helper="MyHelper">
        <ng-template mmFormLabel let-label
                     let-id="id"
                     let-mandatory="mandatory"
                     let-showMandatory="showMandatory"
                     let-mandatorySymbol="mandatorySymbol">
          <!-- TODO - mandatory template test in separate component -->
          <label [attr.for]="id">
            {{label}}
            <span *ngIf="mandatory && showMandatory">
              {{mandatorySymbol}}
            </span>
          </label>
        </ng-template>
        <ng-template mmFormControl let-control>
          <input [formControl]="control">
        </ng-template>
        <ng-template mmFormHelper let-helper>
            <small id="helper">
              {{helper}}
            </small>
        </ng-template>
        <ng-template mmFormError
                     let-error
                     let-key="key"
                     let-value="value"
                     let-controlName="controlName">
          <small id="error">
            {{error}}-{{key}}-{{controlName}}-{{value}}
          </small>
        </ng-template>
      </mm-form-field>
    </form>
  `,
    standalone: false
})
class TemplateTestMMFormFieldComponent {

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      firstName: [{value: null, disabled: false}, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(5)
      ])],
    })
  }
}

const testConfig: MMFormsConfig = {
  // Field
  fieldClass: 'my-field',
  style: 'color: black',
  reverseLabelControl: false,

  // Label
  labelClass: 'my-label',
  labelStyle: 'color: blue',

  // Helper
  helperClass: 'my-helper',
  helperStyle: 'color: green',

  // Error
  errorClass: 'my-error',
  errorStyle: 'color: red',

  // Mandatory
  mandatoryClass: 'my-mandatory',
  mandatoryStyle: 'color: pink',
  mandatorySymbol: '#',
  showMandatory: true,

  // Validation
  invalidOnTouch: false,
  invalidOnDirty: false,
};

describe("MMFormField", () => {

  describe('Base MMFromField', () => {
    let component: TestMMFormFieldComponent;
    let fixture: ComponentFixture<TestMMFormFieldComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          TestMMFormFieldComponent,
        ],
        imports: [
          ReactiveFormsModule,
          MMFormsModule.forRoot({}, {}),
        ],
        schemas: [],
      }).compileComponents();
      fixture = TestBed.createComponent(TestMMFormFieldComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      fixture.detectChanges();
      expect(fixture).toBeTruthy();
    });

    it('should show label', () => {
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement).toBeTruthy();
      expect(label.nativeElement.textContent).toContain('First name');
    });

    it('should label hase for=""', () => {
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement).toBeTruthy();
      expect(label.nativeElement.htmlFor).toEqual('firstName');
    });

    it('should show helper', () => {
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('input'));
      input.nativeElement.value = 'Dylan';

      fixture.detectChanges();

      const helper = fixture.debugElement.query(By.css('small'));
      expect(helper.nativeElement).toBeTruthy();
      expect(helper.nativeElement.textContent).toContain('Your first name');
    });

    it('should show mandatory', () => {
      fixture.detectChanges();
      const mandatory = fixture.debugElement.query(By.css('label > span'));
      expect(mandatory.nativeElement).toBeTruthy();
      expect(mandatory.nativeElement.textContent).toContain('*');
    });

    it('should show error', () => {
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('input'));
      input.nativeElement.focus();
      input.nativeElement.value = 'Dy';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.blur();
      input.nativeElement.dispatchEvent(new Event('blur')); // mark as touched

      fixture.detectChanges();

      expect(component.formGroup.invalid).toBeTrue();
      expect(component.formGroup.get('firstName')?.touched).toBeTrue();
      expect(component.formGroup.get('firstName')?.value).toContain('Dy')
      expect(component.formGroup.get('firstName')?.dirty).toBeTrue();

      const smalls= fixture.debugElement.queryAll(By.css('small'));
      expect(smalls.length).toEqual(2)
      const error = smalls[1];
      expect(error.nativeElement).toBeTruthy();
      expect(error.nativeElement.textContent).toContain('Invalid field');
    });

    it('should not show error', () => {
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('input'));
      input.nativeElement.focus();
      input.nativeElement.value = 'Dylan';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.blur();
      input.nativeElement.dispatchEvent(new Event('blur')); // mark as touched

      fixture.detectChanges();

      expect(component.formGroup.invalid).toBeFalse();
      expect(component.formGroup.get('firstName')?.touched).toBeTrue();
      expect(component.formGroup.get('firstName')?.value).toContain('Dylan')
      expect(component.formGroup.get('firstName')?.dirty).toBeTrue();

      const smalls= fixture.debugElement.queryAll(By.css('small'));
      expect(smalls.length).toEqual(1);
    });
  });

  describe('Inputs MMFormField', () => {
    let component: InputTestMMFormFieldComponent;
    let fixture: ComponentFixture<InputTestMMFormFieldComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          InputTestMMFormFieldComponent,
        ],
        imports: [
          ReactiveFormsModule,
          MMFormsModule.forRoot({}, {
            errorMessageResolver: MMDefaultErrorMessageResolver,
          }),
        ],
        providers: [],
        schemas: [],
      }).compileComponents();
      fixture = TestBed.createComponent(InputTestMMFormFieldComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      fixture.detectChanges();
      expect(fixture).toBeTruthy();
    });

    it('should label', () => {
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement).toBeTruthy();
      expect(label.nativeElement.textContent).toContain(component.label);
      expect(label.nativeElement.style.color).toContain('blue');
      expect(label.nativeElement.className).toContain(component.labelClass);
    });

    it('should custom id', () => {
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement).toBeTruthy();
      expect(label.nativeElement.htmlFor).toEqual(component.id);
    });

    it('should custom helper', () => {
      fixture.detectChanges();
      const helper = fixture.debugElement.query(By.css('small'));
      expect(helper.nativeElement).toBeTruthy();
      expect(helper.nativeElement.textContent).toContain(component.helper);
      expect(helper.nativeElement.className).toContain(component.helperClass);
      expect(helper.nativeElement.style.color).toContain('green');
    });

    it('should invalid on touch', () => {
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('input'));
      input.nativeElement.focus();
      input.nativeElement.value = 'Dy';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.blur();
      input.nativeElement.dispatchEvent(new Event('blur')); // mark as touched

      fixture.detectChanges();

      expect(component.formGroup.invalid).toBeTrue();
      expect(component.formGroup.get('firstName')?.touched).toBeTrue();
      expect(component.formGroup.get('firstName')?.value).toContain('Dy')
      expect(component.formGroup.get('firstName')?.dirty).toBeTrue();

      const smalls= fixture.debugElement.queryAll(By.css('small'));
      expect(smalls.length).toEqual(2)
      const error = smalls[1];
      expect(error.nativeElement).toBeTruthy();
      expect(error.nativeElement.textContent).toContain('Invalid field');
    });

    it('should invalid on dirty', () => {
      fixture.detectChanges();
      component.invalidOnTouch = false;
      component.invalidOnDirty = true;

      const input = fixture.debugElement.query(By.css('input'));
      input.nativeElement.focus();
      input.nativeElement.value = 'Dy';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.blur();

      fixture.detectChanges();

      expect(component.formGroup.invalid).toBeTrue();
      expect(component.formGroup.get('firstName')?.value).toContain('Dy')
      expect(component.formGroup.get('firstName')?.dirty).toBeTrue();

      const smalls= fixture.debugElement.queryAll(By.css('small'));
      expect(smalls.length).toEqual(2)
      const error = smalls[1];
      expect(error.nativeElement).toBeTruthy();
      expect(error.nativeElement.textContent).toContain('Invalid field');
    });

    it('should invalid without check touch and dirty', () => {
      fixture.detectChanges();
      component.invalidOnTouch = false;
      component.invalidOnDirty = false;

      const input = fixture.debugElement.query(By.css('input'));
      input.nativeElement.focus();
      input.nativeElement.value = 'Dy';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.blur();

      fixture.detectChanges();

      expect(component.formGroup.invalid).toBeTrue();
      expect(component.formGroup.get('firstName')?.value).toContain('Dy')
      expect(component.formGroup.get('firstName')?.dirty).toBeTrue();

      const smalls= fixture.debugElement.queryAll(By.css('small'));
      expect(smalls.length).toEqual(2)
      const error = smalls[1];
      expect(error.nativeElement).toBeTruthy();
      expect(error.nativeElement.textContent).toContain('Invalid field');
    })

    it('should reverse label and control', () => {
      fixture.detectChanges();

      let input = fixture.debugElement.query(By.css('label + input'));
      expect(input.nativeElement).toBeTruthy();

      component.reverseLabelControl = true;
      fixture.detectChanges();

      input = fixture.debugElement.query(By.css('input + label'));

      expect(input.nativeElement).toBeTruthy();
    });

    it('should style and class', () => {
      fixture.detectChanges();

      let input = fixture.debugElement.query(By.css('div'));
      expect(input.nativeElement).toBeTruthy();
      expect(input.nativeElement.className).toContain(component.styleClass);
      expect(input.nativeElement.style.border).toContain('1px solid');
    });

    it('should error style and class', () => {
      fixture.detectChanges();
      component.invalidOnDirty = false;
      component.invalidOnTouch = false;

      fixture.detectChanges();

      const smalls = fixture.debugElement.queryAll(By.css('small'));
      expect(smalls.length).toEqual(2);

      let error = smalls[1];
      expect(error.nativeElement).toBeTruthy();
      expect(error.nativeElement.className).toContain(component.errorClass);
      expect(error.nativeElement.style.color).toContain('red');
    });

    it('should mandatory input', () => {
      fixture.detectChanges();

      let mandatory = fixture.debugElement.query(By.css('label > span'));
      expect(mandatory.nativeElement).toBeTruthy();
      expect(mandatory.nativeElement.textContent).toContain(component.mandatorySymbol);
      expect(mandatory.nativeElement.className).toContain(component.mandatoryClass);
      expect(mandatory.nativeElement.style.color).toContain('red');
    });

    it('should mandatory visible', () => {
      fixture.detectChanges();

      let mandatory = fixture.debugElement.query(By.css('label > span'));
      expect(mandatory.nativeElement).toBeTruthy();
      expect(mandatory.nativeElement.textContent).toContain(component.mandatorySymbol);

      component.showMandatory = false;
      fixture.detectChanges();
      mandatory = fixture.debugElement.query(By.css('label > span'));
      expect(mandatory).toBeFalsy();
    });
  });

  describe('Template MMFormField', () => {
    let component: TemplateTestMMFormFieldComponent;
    let fixture: ComponentFixture<TemplateTestMMFormFieldComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          TemplateTestMMFormFieldComponent,
        ],
        imports: [
          ReactiveFormsModule,
          MMFormsModule.forRoot(testConfig, {

          }),
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(TemplateTestMMFormFieldComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      fixture.detectChanges();
      expect(fixture).toBeTruthy();
    });

    it('should label template', () => {
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement).toBeTruthy();
      expect(label.nativeElement.textContent).toContain('MyLabel');

      const mandatory = label.query(By.css('span'));
      expect(mandatory.nativeElement).toBeTruthy();
      expect(mandatory.nativeElement.textContent).toContain('#');
    });

    it('should helper template', () => {
      fixture.detectChanges();

      const helper = fixture.debugElement.query(By.css('#helper'));
      expect(helper.nativeElement).toBeTruthy();
      expect(helper.nativeElement.textContent).toContain('MyHelper');
    });

    it('should error template', () => {
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('#error'));
      expect(component.formGroup.invalid).toBeTrue();
      expect(component.formGroup.get('firstName')?.invalid).toBeTrue();
      expect(component.formGroup.get('firstName')?.valid).toBeFalse();
      expect(component.formGroup.get('firstName')?.touched).toBeFalse();
      expect(component.formGroup.get('firstName')?.dirty).toBeFalse();
      expect(error.nativeElement).toBeTruthy();
      expect(error.nativeElement.textContent).toContain('Invalid field');
      expect(error.nativeElement.textContent).toContain('required');
      expect(error.nativeElement.textContent).toContain('true');
      expect(error.nativeElement.textContent).toContain('firstName');
    });
  });

});
