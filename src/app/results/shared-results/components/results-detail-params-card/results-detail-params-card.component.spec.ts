import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultsDetailParamsCardComponent } from './results-detail-params-card.component';

describe('ResultsDetailParamsCardComponent', () => {
  let component: ResultsDetailParamsCardComponent;
  let fixture: ComponentFixture<ResultsDetailParamsCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsDetailParamsCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsDetailParamsCardComponent);
    component = fixture.componentInstance;
    component.param = { name: "", value: "" };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
