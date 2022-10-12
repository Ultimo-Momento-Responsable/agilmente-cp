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

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('newPassword').value;
    let confirmPass = group.get('confirmNewPassword').value
    if (pass === confirmPass || 
      !group.get('confirmNewPassword').touched ||
      !group.get('newPassword').touched) {
        this.showError = false;
        return null;
      }
      return { notSame: true }
  }

  checkErrors() {
    if (this.changePasswordForm.hasError('notSame')){
      this.showError = true;
      this.errorLabel = "Las contraseñas no coinciden";
    }
    if (this.changePasswordForm.get('newPassword').hasError('minlength') || this.changePasswordForm.get('confirmNewPassword').hasError('minlength')){
      this.showError = true;
      this.errorLabel = "La contraseña debe poseer al menos 8 caracteres";
    }
  }
}
