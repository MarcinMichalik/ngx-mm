import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoNestedFormsComponent } from './demo-nested-forms.component';

describe('DemoNestedFormsComponent', () => {
  let component: DemoNestedFormsComponent;
  let fixture: ComponentFixture<DemoNestedFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoNestedFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoNestedFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
