import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CircuitsPage } from './circuits.page';

describe('CircuitsPage', () => {
  let component: CircuitsPage;
  let fixture: ComponentFixture<CircuitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CircuitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
