import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MMFormMandatoryDirective} from './mm-form-mandatory.directive';

@Component({
    template: `
    <ng-template mmFormMandatory>
      <small id="error">Error</small>
    </ng-template>
  `,
    standalone: false
})
class TestComponent {
  @ViewChild(MMFormMandatoryDirective, {static: true}) formMandatory!: MMFormMandatoryDirective;
}

describe('MmFormMandatoryDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MMFormMandatoryDirective, TestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    fixture.detectChanges();
    expect(component.formMandatory).toBeDefined();
    expect(component.formMandatory.templateRef).toBeDefined();
  });
});
