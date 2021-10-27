import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "./services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  myForm: FormGroup;
  errorLogin: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(){
    this.checkIfLogged()
    this.myForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ionViewWillEnter() {
    
  }

  /**
   * Realiza el logueo, y chequea que los datos sean correctos.
   */
  doLogin() {
    this.loginService.login(this.myForm.value.userName, this.myForm.value.password).subscribe(data => {
      if (data.length > 10){
        window.localStorage.setItem('token', data);
        this.router.navigate(["/patients"]);
      } else{
        this.errorLogin = true;
      }
    });
  }

  /**
   * Si se está en la pagina de login y ya se está logueado te redirige automáticamente a la página de patients
   */
  checkIfLogged() {
    this.loginService.checkIfLogged(window.localStorage.getItem('token')).subscribe(data => {
      if (data) {
        this.router.navigate(["/patients"]);
      }
    });
  }
}
