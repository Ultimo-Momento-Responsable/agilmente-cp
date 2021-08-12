import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CustomDatePipe } from 'src/app/shared/pipes/custom-date.pipe';
import { SharedResultsModule } from '../../shared-results.module';

import { ResultCardComponent } from './result-card.component';

const testResult = {
  id: 45,
  game: 'Encuentra el Repetido',
  patient: 'Julian Marquez',
  canceled: false,
  completeDatetime: '01-07-2021 20:22:34',
  timeBetweenSuccesses: [1, 3, 4, 2, 2, 3, 4, 5, 6, 7, 2],
  mistakes: 5,
  successes: 11,
  totalTime: 123.432,
};

describe('ResultCardComponent', () => {
  let component: ResultCardComponent;
  let fixture: ComponentFixture<ResultCardComponent>;
  let customDatePipeMock;

  beforeEach(
    waitForAsync(() => {
      customDatePipeMock = {
        transform: (value, ...args) => {
          return '';
        },
      };
      TestBed.configureTestingModule({
        declarations: [ResultCardComponent],
        imports: [IonicModule.forRoot(), SharedResultsModule],
        providers: [{ provide: CustomDatePipe, useValue: customDatePipeMock }],
      }).compileComponents();

      fixture = TestBed.createComponent(ResultCardComponent);
      component = fixture.componentInstance;
      component.result = testResult;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
