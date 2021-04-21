import {NgModule} from '@angular/core';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations : [
    SignupComponent,
    LoginComponent,
  ],
  imports : [
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule
  ],
  exports : []
})
export class AuthModule{}
