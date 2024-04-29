import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-demo-nested-forms',
  templateUrl: './demo-nested-forms.component.html',
  styleUrls: ['./demo-nested-forms.component.scss']
})
export class DemoNestedFormsComponent implements OnInit {

  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      firstName: [{value: null, disabled: false}, Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
  }

}
