<br />
<p align="center">
 <img width="50%" height="50%" src="./logo-design/logo-svg/ngx-mm_full_color.svg">
</p>
<p align="center">
  ngx-mm is an Angular developers toolkit for simplified Angular application development
</p>
<h2></h2>

[![codecov](https://codecov.io/gh/MarcinMichalik/ngx-mm/graph/badge.svg?token=sNvelLkcGO)](https://codecov.io/gh/MarcinMichalik/ngx-mm)

I develop many applications and notice a lot of repeating patterns that I decided to move to a separate library. You can see a lot of connection to PrimeNG as I mainly use it in my Angular applications. If you see potential to be used with another library, don't hesitate to use it. If you find a bug or have an idea for improvement, you can create an issue with a good description.


## Installation

```Shell
npm install ngx-mm --save
```

## Components

### Forms

#### Getting started
Import `MMFormsModule` to your AppModule

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MMFormsModule.forRoot({
      // confgiuration
    }, {
      // providers
    }),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Now you can use in your forms:

`app.component.html`
```html
<form [formGroup]="myForm">
  <mm-form-field formControlName="username" label="Username">
    <ng-template mmFormControl let-control>
      <input [formControl]="control">
    </ng-template>
  </mm-form-field>
</form>
```

`app.component.ts`
```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      username: [{value: null, disabled: false}, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(5)
      ])]
    })
  }
}
```

#### Configuration

Create your own implementation of `MMErrorMessageResolver`.

```typescript
export class CustomMessageResolver implements MMErrorMessageResolver {
  resolveErrorMessage(key: string, value?: any, formControlName?: string | number | null): string {
    switch (key) {
      case 'required':
        return 'This field is required';
      case 'minlength':
        return `The min length of ${value.requiredLength} characters is not reached, you typed in ${value.actualLength} characters`;
      case 'maxlength':
        return `The max length of ${value.requiredLength} characters is reached, you typed in ${value.actualLength} characters`;
      default:
        return 'This field is invalid'
    }
  }
}
```

Provide your implementation in global configuration. Additionally, you can also configure the default style, class, and behaviors in the global configuration.

_The full list of configurations can be found below_

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MMFormsModule.forRoot({
      fieldClass: 'field',
      errorClass: 'text-red-900',
      showMandatory: true,
      mandatorySymbol: '#',
      invalidOnTouch: true,
      invalidOnDirty: false,
    }, {
      errorMessageResolver: CustomMessageResolver
    }),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Override global configuration
You have many options for overriding the global configuration:
* by providers
* by input
* by template

##### By provider
Wherever you can provide providers (module, component, routes) you can override the forms configuration.

```typescript
...

providers: [
  {
    provide: MM_FORMS_CONFIG,
    useValue: {}
  },
  {
    provide: MMErrorMessageResolver,
    useClass: CustomMessageResolver
  }
]

...
```

##### By input
Every possible configuration can be override by component `Input` (all possible inputs are below).

```html
...

<mm-form-field formControlName="field"
               label="Username"
               class="col-12"
               [showMandatory]="false"
               mandatorySymbol="#" labelStyleClass="text-red-500"
               [invalidOnTouch]="true">
  <ng-template mmFormControl let-control>
    <input pInputText
           [formControl]="control"
           class="w-full"
           [class.ng-dirty]="control?.touched && control?.invalid"
           [class.ng-invalid]="control?.touched && control?.invalid">
  </ng-template>
</mm-form-field>

...
```
##### By template
If providers and inputs are not enough, you can use templates to modify the component (all possible templates are below).

```html
...

<mm-form-field formControlName="field"
               label="Username"
               class="col-12"
               [showMandatory]="false"
               mandatorySymbol="#" labelStyleClass="text-red-500"
               [invalidOnTouch]="true">
  <ng-template mmFormControl let-control>
    <input pInputText
           [formControl]="control"
           class="w-full"
           [class.ng-dirty]="control?.touched && control?.invalid"
           [class.ng-invalid]="control?.touched && control?.invalid">
  </ng-template>
  <ng-template mmMmFormLabel let-label>
    MyLabel is {{label}}
  </ng-template>
</mm-form-field>

...
```

#### APIs
##### Inputs (properties)
| Name                  | Type    | Default | Description                                                                                       |
|-----------------------|---------|--------|---------------------------------------------------------------------------------------------------|
| `label`               | string  | ''     | Form field label                                                                                  |
| `id`                  | string  | ''     | Unique identifier of form field ("for" use case)                                                  |
| `helper`              | string  | ''     | Help text for form field                                                                          |
| `invalidOnTouch`      | boolean | true   | Show invalid state when form field is touched (use `invalidOnTouch` or `invalidOnDirty` not both) |
| `invalidOnDirty`      | boolean | false  | Show invalid state when form field is dirty (use `invalidOnTouch` or `invalidOnDirty` not both)   |
| `reverseLabelControl` | boolean | false  | Reverse order of label and control form                                                           |
| `style`               | string  | ''     | Inline style of field                                                                             |
| `styleClass`          | string  | 'field' | Style class of field                                                                              |
| `labelStyle`          | string  | ''     | Inline style of label                                                                             |
| `labelStyleClass`     | string  | ''     | Style class of label                                                                              |
| `helperStyle`         | string  | ''     | Inline style of helper                                                                            |
| `helperStyleClass`    | string  | ''     | Style class of helper                                                                             |
| `errorStyle`          | string  | ''       | Inline style of error                                                                             |
| `errorStyleClass`     | string  | ''   | Style class of error                                                                              |
| `mandatorySymbol`     | string  | *      | Symbol of mandatory                                                                               |
| `mandatoryStyle`      | string  | ''     | Inline style of mandatory                                                                         |
| `mandatoryClass` | string | '' | Style class of mandatory                                                                          |
| `showMandatroy`       | boolean | true   | When present show mandatory symbol if form contorol has required validator                        |

##### Templates

###### mmFormControl
Template displaying form control. **Required**
```html
<ng-template mmFormControl let-control></ng-template>
```
Context

| Name    | Type            | Implicit |
|---------|-----------------|----------|
| control | AbstractControl | true     |

###### mmFormLabel
Template displaying form label.
```html
<ng-template mmFormLabel let-label></ng-template>
```
Context

| Name            | Type    | Implicit |
|-----------------|---------|----------|
| label           | string  | true     |
| id              | string  | false    |
| mandatory       | boolean | false    |
| showMandatory   | boolean | false    |
| mandatorySymbol | string  | false    |

###### mmFormMandatory
Template displaying form mandatory.
```html
<ng-template mmFormMandatory let-mandatory></ng-template>
```
Context

| Name            | Type    | Implicit |
|-----------------|---------|----------|
| mandatory       | boolean | true     |
| showMandatory   | boolean | false    |
| mandatorySymbol | string  | false    |

###### mmFormHelper
Template displaying form helper.
```html
<ng-template mmFormHelper let-helper></ng-template>
```

Context

| Name            | Type    | Implicit |
|-----------------|---------|----------|
| helper          | string  | true     |

###### mmFormError
Template displaying errors
```html
<ng-template mmFormError></ng-template>
```
Context

| Name        | Type   | Implicit |
|-------------|--------|----------|
| message     | string | true     |
| key         | string | false    |
| value       | string | false    |
| controlName | string | false    |


##### Types
`MMConfig`

```typescript
export interface MMFormsConfig {
  // Field
  fieldClass?: string;
  style?: string;
  reverseLabelControl?: boolean;

  // Label
  labelClass?: string;
  labelStyle?: string;

  // Helper
  helperClass?: string;
  helperStyle?: string;

  // Error
  errorClass?: string;
  errorStyle?: string;

  // Mandatory
  mandatoryClass?: string;
  mandatoryStyle?: string;
  mandatorySymbol?: string;
  showMandatory?: boolean;

  // Validation
  invalidOnTouch?: boolean;
  invalidOnDirty?: boolean;
}
```
`MMErrorMessageResolver`
```typescript
export abstract class MMErrorMessageResolver {

  public abstract resolveErrorMessage(key: string, value?: any, formControlName?: string | null | number): string;

}
```

