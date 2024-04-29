import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MM_FORMS_CONFIG} from './configs/mm-config';
import {MMFormControlDirective} from './directives/mm-form-control.directive';
import {MMFormErrorDirective} from './directives/mm-form-error.directive';
import {MMFormHelperDirective} from './directives/mm-form-helper.directive';
import {MMFormLabelDirective} from './directives/mm-form-label.directive';

import {MMFormField} from './mm-form-field';
import {MMDefaultErrorMessageResolver, MMErrorMessageResolver} from './services/mm-error-message-resolver.service';

@Component({
  template: `
    <form [formGroup]="formGroup">
      <mm-form-field formControlName="firstName" label="first name">
        <ng-template mmFormControl let-control>
          <input [formControl]="control">
        </ng-template>
      </mm-form-field>
    </form>
  `
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

describe("MMFormField", () => {
  let component: MMFormField;
  let fixture: ComponentFixture<MMFormField>;
  let stub: ComponentFixture<TestMMFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MMFormField,
        TestMMFormFieldComponent,
        MMFormControlDirective,
        MMFormLabelDirective,
        MMFormHelperDirective,
        MMFormErrorDirective
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: MMErrorMessageResolver,
          useClass: MMDefaultErrorMessageResolver
        },
        {
          provide: MM_FORMS_CONFIG,
          useValue: {

          },
        }
      ],
      schemas: [],
    }).compileComponents();

    fixture = TestBed.createComponent(MMFormField);
    stub = TestBed.createComponent(TestMMFormFieldComponent);
    component = fixture.componentInstance;
    const control = new FormControl('old value');

    // fixture.detectChanges();
  });

  it('should create', () => {
    stub.detectChanges();
    const form = stub.componentInstance.formGroup;
    console.log('Form', form.invalid)
    // expect(true).toEqual(true);
    expect(stub).toBeTruthy();
    expect(form.invalid).toBeTrue();
  });
});
