import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HayUnoRepetidoResultsTimeGraphComponent } from './hay-uno-repetido-results-time-graph.component';

describe('HayUnoRepetidoResultsTimeGraphComponent', () => {
  let component: HayUnoRepetidoResultsTimeGraphComponent;
  let fixture: ComponentFixture<HayUnoRepetidoResultsTimeGraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HayUnoRepetidoResultsTimeGraphComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HayUnoRepetidoResultsTimeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
