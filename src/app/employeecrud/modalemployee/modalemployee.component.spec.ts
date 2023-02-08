import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalemployeeComponent } from './modalemployee.component';

describe('ModalemployeeComponent', () => {
  let component: ModalemployeeComponent;
  let fixture: ComponentFixture<ModalemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalemployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
