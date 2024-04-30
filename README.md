# ngx-mm

ngx-mm is an Angular developers toolkit for simplified Angular application development.

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
| Name                  | Type    | Default | Description |
|-----------------------|---------|---------|-------------|
| `label`               | string  | null    | _TODO_      |
| `id`                  | string  | null    | _TODO_      |
| `helper`              | string  | null    | _TODO_      |
| `invalidOnTouch`      | boolean | true    | _TODO_      |
| `invalidOnDirty`      | boolean | false   | _TODO_      |
| `reverseLabelControl` | boolean | false   | _TODO_      |
| `style`               | string  | null    | _TODO_      |
| `styleClass`          | string  | null    | _TODO_      |
| `labelStyle`          | string  | null    | _TODO_      |
| `labelStyleClass`     | string  | null    | _TODO_      |
| `helperStyle`         | string  | null    | _TODO_      |
| `helperStyleClass`    | string  | null    | _TODO_      |
| `errorStyle`          | string  | null    | _TODO_      |
| `errorStyleClass`     | string  | null    | _TODO_      |
| `mandatorySymbol`     | string  | *       | _TODO_      |
| `mandatoryStyle`      | string  | *       | _TODO_      |
| `showMandatroy`       | boolean | true    | _TODO_      |

##### Templates

| Name(directive) | Parameters                                            | Description |
|-----------------|-------------------------------------------------------|-------------|
| mmFromControl   | `{$implicit: AbstractControl}`                        | _TODO_      |
| mmFromLabel     | `{$implicit: string, id: string, mandatory: boolean}` | _TODO_      |
| mmFromHelper    | `{$implicit: string}`                                 | _TODO_      |
| mmFromError     | `{$implicit: string}`                                 | _TODO_      |

##### Types
`MMConfig`
_TODO - describe config_
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

## RoadMap
* [ ] Prepare documentation with showcase on github project pages

## Ideas for the future
* LabelResolver by ngControl name (translation?)???
  * Prefix key - how?
* PrimeNG Table - Parser fo (Table)LazyLoadEvent to:
  * Parse to HttpParams (simple and extended (with matchMode)) - mainly for SpringController request params
  * Parse to RouterParams -> LazyLoadEvent -> RouterParams -> HttpParams (table state (page, filter, sort) as RouterParams)
* Try extends @angular/form (label, mandatory?...)
* DynamicDialog wrapper - 
* ...

# Documentation tools to check
* [Docusaurus](https://docusaurus.io/)
* [StoryBook](https://storybook.js.org/)
* !!! [ng-doc](https://ng-doc.com/)
* [compodoc](https://compodoc.app/)
