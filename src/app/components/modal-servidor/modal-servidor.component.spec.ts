import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServidorComponent } from './modal-servidor.component';

describe('ModalServidorComponent', () => {
  let component: ModalServidorComponent;
  let fixture: ComponentFixture<ModalServidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalServidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
