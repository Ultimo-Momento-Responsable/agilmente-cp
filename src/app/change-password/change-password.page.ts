import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { DialogsComponent } from 'src/app/shared/components/dialogs/dialogs.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  constructor(private loginService: LoginService, 
              private dialog: DialogsComponent) { }

  changePasswordForm: UntypedFormGroup;
  errorLabel = "";
  showError = false;

  ngOnInit() {
    this.changePasswordForm = new UntypedFormGroup({
      oldPassword: new UntypedFormControl('', Validators.required),
      newPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
      confirmNewPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(8)])
    }, { validators: this.checkPasswords });
  }

  ionViewWillEnter() {
    this.changePasswordForm.reset();
    this.changePasswordForm.valueChanges.subscribe(()=>{
      this.checkErrors();
    })
  }

  /**
   * Intenta realizar el cambio de contraseña,
   * si funciona se muestra un cartel y te redirige a la pantalla de pacientes.
   * si falla te muestra un error
   */
  changePassword() {
    this.loginService.changePassword(
      this.changePasswordForm.value.oldPassword,
      this.changePasswordForm.value.newPassword).subscribe(res=>{
        if (res){
          this.dialog.presentAlert('Cambiar contraseña', "El cambio de contraseña ha sido exitoso", null, '/patients')
        } else {
          this.showError = true;
          this.errorLabel = "Tu antigua contraseña no corresponde con la contraseña ingresada";
        }
      })
  }

  /**
   * Validator para verificar que las password sean iguales
   * @param group formgroup
   * @returns null si son iguales, notSame Error si son distintas
   */
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('newPassword');
    let confirmPass = group.get('confirmNewPassword');
    let oldPassword = group.get('oldPassword');
    if (oldPassword.value === pass.value){
      pass.setErrors({ sameOldPassword: true });
      confirmPass.setErrors({ sameOldPassword: true });
      return { sameOldPassword: true };
    }
    if (pass.value === confirmPass.value || 
        !pass.touched ||
        confirmPass.value=="") {
      this.showError = false;
      if (!pass.hasError('minlength') && !confirmPass.hasError('minlength')){
        pass.setErrors(null);
        confirmPass.setErrors(null);
      }
      return null;
    }
    pass.setErrors({ notSame: true });
    confirmPass.setErrors({ notSame: true });
    return { notSame: true }
  }

  /**
   * Verifica los errores en los campos y cambia el label según corresponda
   */
  checkErrors() {
    if (this.changePasswordForm.get('newPassword').hasError('minlength') || this.changePasswordForm.get('confirmNewPassword').hasError('minlength')){
      this.showError = true;
      this.errorLabel = "La contraseña debe poseer al menos 8 caracteres";
    }
    if (this.changePasswordForm.hasError('notSame')){
      this.showError = true;
      this.errorLabel = "Las contraseñas no coinciden";
    }
    if (this.changePasswordForm.hasError('sameOldPassword')) {
      this.showError = true;
      this.errorLabel = "La contraseña nueva no debe ser igual a la antigua";
    }
  }
}
