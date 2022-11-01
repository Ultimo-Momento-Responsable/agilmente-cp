import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DialogsComponent } from '../shared/components/dialogs/dialogs.component';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  resetPasswordForm: UntypedFormGroup;
  errorReset: boolean = false;
  constructor(private loginService: LoginService,
              private dialog: DialogsComponent) { }

  ngOnInit() {
    this.resetPasswordForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email])
    });
  }

  /**
   * metodo para reiniciar contraseña
   */
  resetPassword(){
    this.loginService.resetPassword(this.resetPasswordForm.value.email).subscribe(res=>{
      if (res) {
        this.dialog.presentAlert('Reiniciar contraseña', "El reinicio de contraseña ha sido exitoso", null, '/login')
      } else {
        this.errorReset = true;
      }
    })
  }
}
