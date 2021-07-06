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
  scrollDepthTriggered = false;
  pageNumber = 0;
  patients: any[];
  formatedPatients: Patient[] = [];
  auxPatient: Patient;
  constructor(private patientsApiService: PatientsApiService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getPatients();
  }

  getPatients() {
    this.patientsApiService.getPatients(this.pageNumber).subscribe(res =>{
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
    this.scrollDepthTriggered = false;
  }

  async logScrolling($event) {
    // only send the event once
    if(this.scrollDepthTriggered) {
      return;
    }

    if($event.target.localName != "ion-content") {
      // not sure if this is required, just playing it safe
      return;
    }

    const scrollElement = await $event.target.getScrollElement();

    // minus clientHeight because trigger is scrollTop
    // otherwise you hit the bottom of the page before 
    // the top screen can get to 80% total document height
    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;

    const currentScrollDepth = $event.detail.scrollTop;

    const targetPercent = 80;

    let triggerDepth = ((scrollHeight / 100) * targetPercent);

    if(currentScrollDepth > triggerDepth) {
      // this ensures that the event only triggers once
      this.scrollDepthTriggered = true;
      // do your analytics tracking here
      this.pageNumber++;
      this.getPatients();
    }
  }
}
