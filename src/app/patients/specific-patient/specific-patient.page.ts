import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { ResultsApiService } from 'src/app/results/services/results-api.service';
import { PatientsApiService } from '../services/patients-api.service';

export interface Patient {
  id: number,
  firstName: string,
  lastName: string,
  description: string,
  birthDate: Date,
  city: string
}

@Component({
  selector: 'app-specific-patient',
  templateUrl: './specific-patient.page.html',
  styleUrls: ['./specific-patient.page.scss'],
})
export class SpecificPatientPage implements OnInit {
  @ViewChild('lineCumulativeCanvas') private lineCumulativeCanvas: ElementRef;
  myForm: FormGroup;
  id: any;
  patient: Patient;
  lineCumulative: any;
  results: any;

  constructor(
    private patientsApiService: PatientsApiService, 
    private resultsApiService: ResultsApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      birthDate: new FormControl(),
      description: new FormControl(),
      city: new FormControl()
    });
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
    this.patientsApiService.getPatientById(this.id).subscribe(res => {
      this.myForm.setValue({
        firstName: res.firstName,
        lastName: res.lastName,
        birthDate: res.bornDate,
        description: res.description,
        city: res.city
      }) 
    }); 
    this.resultsApiService.getResults().subscribe(res => {
      this.results = res.content;
      this.createLineCumulative();
    });
  }
  createLineCumulative() {
    this.lineCumulative = new Chart(this.lineCumulativeCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: this.results.map((r, i) => `Partida ${i + 1}`),
          datasets: [{
              label: 'Aciertos',
              backgroundColor: 'rgba(102, 195, 95, 0.4)',
              borderColor: 'rgba(102, 195, 95, 1)',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: 'rgba(102, 195, 95, 1)',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(102, 195, 95, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.results.map(r => r.successes),
              spanGaps: false,
          }, {
              label: 'Errores',
              backgroundColor: 'rgba(195, 95, 95, 0.4)',
              borderColor: 'rgba(195, 95, 95, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: 'rgba(195, 95, 95, 1)',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.results.map(r => r.mistakes),
              spanGaps: false,
          }
          ]
      }
  });
  }

}
