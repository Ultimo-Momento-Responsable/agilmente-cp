import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HayUnoRepetidoResultsGeneralTableComponent } from './hay-uno-repetido-results-general-table.component';

describe('HayUnoRepetidoResultsGeneralTableComponent', () => {
  let component: HayUnoRepetidoResultsGeneralTableComponent;
  let fixture: ComponentFixture<HayUnoRepetidoResultsGeneralTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HayUnoRepetidoResultsGeneralTableComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HayUnoRepetidoResultsGeneralTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
