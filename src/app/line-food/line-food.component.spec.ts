import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineFoodComponent } from './line-food.component';

describe('LineFoodComponent', () => {
  let component: LineFoodComponent;
  let fixture: ComponentFixture<LineFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
