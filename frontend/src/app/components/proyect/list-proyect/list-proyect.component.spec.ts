import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProyectComponent } from './list-proyect.component';

describe('ListProyectComponent', () => {
  let component: ListProyectComponent;
  let fixture: ComponentFixture<ListProyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProyectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
