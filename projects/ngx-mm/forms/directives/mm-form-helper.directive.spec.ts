import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MMFormHelperDirective} from './mm-form-helper.directive';

@Component({
    template: `
    <ng-template mmFormHelper>
      <small id="error">Error</small>
    </ng-template>
  `,
    standalone: false
})
class TestComponent {
  @ViewChild(MMFormHelperDirective, {static: true}) fromHelper!: MMFormHelperDirective;
}

describe('MmFormHelperDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MMFormHelperDirective, TestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    fixture.detectChanges();
    expect(component.fromHelper).toBeDefined();
    expect(component.fromHelper.templateRef).toBeDefined();
  });
});
