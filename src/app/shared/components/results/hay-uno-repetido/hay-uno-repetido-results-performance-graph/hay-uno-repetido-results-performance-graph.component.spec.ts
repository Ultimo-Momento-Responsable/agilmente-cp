import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HayUnoRepetidoResultsPerformanceGraphComponent } from './hay-uno-repetido-results-performance-graph.component';

describe('HayUnoRepetidoResultsPerformanceGraphComponent', () => {
  let component: HayUnoRepetidoResultsPerformanceGraphComponent;
  let fixture: ComponentFixture<HayUnoRepetidoResultsPerformanceGraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HayUnoRepetidoResultsPerformanceGraphComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HayUnoRepetidoResultsPerformanceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
