import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  private readonly formBuilder = inject(FormBuilder);

  simpleForm = this.formBuilder.group({
    field: [{value: null, disabled: false}, Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(5)
    ])]
  });
  username: any;


  constructor() { }

  ngOnInit(): void {
  }

  code = `
  @NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MMFormsModule.forRoot({
      fieldClass: 'text-green-900'
    }, {
      // errorMessageResolver: MyErrorResolver
    }),
  ],
  providers: [
    {
      provide: MM_FORMS_CONFIG,
      useValue: {
        fieldClass: 'text-blue-500 col-6'
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
  `;
}
