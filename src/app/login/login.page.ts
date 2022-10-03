import { Component, HostListener, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "./services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  myForm: UntypedFormGroup;
  errorLogin: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(){
    this.checkIfLogged()
    this.myForm = new UntypedFormGroup({
      userName: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required)
    });
  }

  ionViewWillEnter() {
    
  }

  /**
   * Realiza el logueo, y chequea que los datos sean correctos.
   */
  doLogin() {
    this.loginService.login(this.myForm.value.userName, this.myForm.value.password).subscribe(res => {
      // Checkeamos que el usuario sea válido previo a parsear el JSON
      if (res != "") {
        
        const professional = JSON.parse(res);
        if (professional.token.length > 10){
          window.localStorage.setItem('token', professional.token);
          window.localStorage.setItem('firstName', professional.firstName);
          window.localStorage.setItem('lastName', professional.lastName);
          window.localStorage.setItem('professionalId', professional.id);
          this.router.navigate(["/patients"]);
        } else {
          this.errorLogin = true;
        }
      } else {
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
  
  /*
  * Escucha a si se presiona la tecla Enter y realiza el proceso de login
  */
  @HostListener("keyup.enter") onKeyupEnter() {
    this.doLogin();
  }
}
