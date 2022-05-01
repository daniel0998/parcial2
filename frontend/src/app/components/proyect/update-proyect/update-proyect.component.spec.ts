import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProyectComponent } from './update-proyect.component';

describe('UpdateProyectComponent', () => {
  let component: UpdateProyectComponent;
  let fixture: ComponentFixture<UpdateProyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProyectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
