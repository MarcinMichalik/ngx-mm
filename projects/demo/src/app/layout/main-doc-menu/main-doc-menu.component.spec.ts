import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDocMenuComponent } from './main-doc-menu.component';

describe('MainDocMenuComponent', () => {
  let component: MainDocMenuComponent;
  let fixture: ComponentFixture<MainDocMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MainDocMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDocMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
