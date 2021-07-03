import { Component, OnInit } from '@angular/core';
import { PatientsApiService } from './services/patients-api.service';

export interface Patient {
  id: number,
  firstName: string,
  lastName: string,
  description: string,
  age: number,
  city: string
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})

export class PatientsPage implements OnInit {

  patients: any[];
  formatedPatients: Patient[] = [];
  auxPatient: Patient;
  constructor(private patientsApiService: PatientsApiService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.patientsApiService.getPatients().subscribe(res =>{
      this.patients = res.content;
      this.patients.forEach(p => {
        const bdate = new Date(p.bornDate);
        const timeDiff = Math.abs(Date.now() - bdate.getTime());
        const calculatedAge = (Math.floor((timeDiff / (1000 * 3600 * 24)) / 365));
        this.auxPatient = {
          "id": p.id,
          "firstName": p.firstName,
          "lastName": p.lastName,
          "description": p.description,
          "age": calculatedAge,
          "city": p.city
        }
        this.formatedPatients.push(this.auxPatient);
      })
    });
  }
}
