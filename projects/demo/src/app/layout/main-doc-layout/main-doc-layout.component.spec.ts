import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDocLayoutComponent } from './main-doc-layout.component';

describe('MainDocLayoutComponent', () => {
  let component: MainDocLayoutComponent;
  let fixture: ComponentFixture<MainDocLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MainDocLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDocLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
