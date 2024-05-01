import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MMFormErrorDirective} from './mm-form-error.directive';

@Component({
  template: `
    <ng-template mmFormError>
      <small id="error">Error</small>
    </ng-template>
  `
})
class TestComponent {
  @ViewChild(MMFormErrorDirective, {static: true}) formError!: MMFormErrorDirective;
}

describe('MmFormErrorDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MMFormErrorDirective, TestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    fixture.detectChanges();
    expect(component.formError).toBeDefined();
    expect(component.formError.templateRef).toBeDefined();
  });
});
