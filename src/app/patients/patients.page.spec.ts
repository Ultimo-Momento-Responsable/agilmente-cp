  import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
  import { IonicModule } from '@ionic/angular';
  import { HttpClientModule } from '@angular/common/http';

  import { PatientsPage } from './patients.page';

  describe('PatientsPage', () => {
    let component: PatientsPage;
    let fixture: ComponentFixture<PatientsPage>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ PatientsPage ],
        imports: [IonicModule.forRoot(), HttpClientModule],
        providers: [ HttpClientModule]
      }).compileComponents();

      fixture = TestBed.createComponent(PatientsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
