import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CardHayUnoRepetidoResultComponent } from './card-hay-uno-repetido-result.component';


describe('CardGameResultComponent', () => {
  let component: CardHayUnoRepetidoResultComponent;
  let fixture: ComponentFixture<CardHayUnoRepetidoResultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardHayUnoRepetidoResultComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardHayUnoRepetidoResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
