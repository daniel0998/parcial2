import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProyectComponent } from './save-proyect.component';

describe('SaveProyectComponent', () => {
  let component: SaveProyectComponent;
  let fixture: ComponentFixture<SaveProyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveProyectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
