import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsUserComponent } from './ts-user.component';

describe('TsUserComponent', () => {
  let component: TsUserComponent;
  let fixture: ComponentFixture<TsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TsUserComponent]
    });
    fixture = TestBed.createComponent(TsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
