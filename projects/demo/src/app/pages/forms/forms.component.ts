import {Component, forwardRef, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MMFormsModule
} from 'ngx-mm';
import {InputTextModule} from 'primeng/inputtext';
import {MM_FORMS_CONFIG} from '../../../../../ngx-mm/src/lib/forms/configs/mm-config';
import {MMErrorMessageResolver} from '../../../../../ngx-mm/src/lib/forms/services/mm-error-message-resolver.service';
import {CodeModule} from '../../shared/code/code.module';
import {DemoFormNestedModule} from './demo-form-nested/demo-form-nested.module';




@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    MMFormsModule,
    DemoFormNestedModule,
    CodeModule
  ],
  providers: [
    {
      provide: MM_FORMS_CONFIG,
      useValue: {
        fieldClass: 'text-red-500'
      }
    }
  ],
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


  constructor() { }

  ngOnInit(): void {
  }

}
