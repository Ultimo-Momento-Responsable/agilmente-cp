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

  ngOnInit() {
    this.getPatients().subscribe(res =>{
        console.log("Res",res)
        this.patients = res;
    });
  }

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
