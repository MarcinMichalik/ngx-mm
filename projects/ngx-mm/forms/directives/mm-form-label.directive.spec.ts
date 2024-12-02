import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MMFormLabelDirective} from './mm-form-label.directive';

@Component({
    template: `
    <ng-template mmFormLabel>
      <small id="error">Error</small>
    </ng-template>
  `,
    standalone: false
})
class TestComponent {
  @ViewChild(MMFormLabelDirective, {static: true}) formLabel!: MMFormLabelDirective;
}

describe('MmFormLabelDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MMFormLabelDirective, TestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    fixture.detectChanges();
    expect(component.formLabel).toBeDefined();
    expect(component.formLabel.templateRef).toBeDefined();
  });
});
