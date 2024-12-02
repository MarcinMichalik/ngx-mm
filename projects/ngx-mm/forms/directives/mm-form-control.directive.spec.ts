import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MMFormControlDirective} from './mm-form-control.directive';

@Component({
    template: `
    <ng-template mmFormControl>
      <small id="error">Error</small>
    </ng-template>
  `,
    standalone: false
})
class TestComponent {
  @ViewChild(MMFormControlDirective, {static: true}) formControl!: MMFormControlDirective;
}

describe('MmFormControlDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MMFormControlDirective, TestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    fixture.detectChanges();
    expect(component.formControl).toBeDefined();
    expect(component.formControl.templateRef).toBeDefined();
  });
});
