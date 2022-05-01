import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProyectColabComponent } from './list-proyect-colab.component';

describe('ListProyectColabComponent', () => {
  let component: ListProyectColabComponent;
  let fixture: ComponentFixture<ListProyectColabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProyectColabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProyectColabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
