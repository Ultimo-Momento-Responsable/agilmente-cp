import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Patient {
  id: string;
  name: string;
  avatar: string;
  comment: string;
}

export interface RootObject {
  patients: Patient[];
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})

export class PatientsPage implements OnInit {
  patients: Array<any>;

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getPatients().subscribe(res =>{
      this.patients = res;
    });
  }

  /**
  * getPatients()
  * @returns {Observable} - Lee los datos del JSON y devuelve los objetos bajo 'patients'
  */
  getPatients(){
    return this.http
    .get("assets/patients.json")
    .pipe(
      map((res:any) => {
        return res.patients;
      })
    )
  }
}
