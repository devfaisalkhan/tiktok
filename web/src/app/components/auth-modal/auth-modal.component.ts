import { Component, computed, effect, Input, input, signal, ɵINPUT_SIGNAL_BRAND_WRITE_TYPE } from '@angular/core';
import { AuthStep, IloginForm } from './auth.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentsWithFormsModule } from '../components-with-forms.module';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../pages/auth/auth.service';


@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ComponentsWithFormsModule
  ],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss'
})
export class AuthModalComponent {
  @Input() viewStep!: AuthStep;   

  AuthStepEnum = AuthStep;
  loginFormGroup!: FormGroup<IloginForm>;


  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private authSvc: AuthService
  ) {
    this._createFormGroups();
  }

  onGoToStepClicked(step: AuthStep) {
    this.viewStep = step;
  }

  async onLoginFormSubmitted(data: any) {
    await this.authSvc.authenticate(data);
  }

  onCloseModalClicked() {
    this.matDialog.closeAll();
  }

  private _createFormGroups() {
    this.loginFormGroup = this.formBuilder.group<IloginForm>({
      username: new FormControl('', {nonNullable: true, validators: Validators.required } ),
      password: new FormControl('', {nonNullable: true, validators: Validators.required} ),
    });

  }
}