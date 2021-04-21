import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm : FormGroup;
  hide : Boolean = true;
  isLoading : boolean = false;
  private loadingStateSubscription : Subscription;

  constructor(private authService : AuthService,private uiService :UiService) {}

  ngOnInit(): void {
    this.loadingStateSubscription = this.uiService.loadingStateChanged.subscribe(state => this.isLoading=state);
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required])
    });
  }

  onSubmit() {
    const {email,password} = this.loginForm.value;
    this.authService.login({email,password});
  }
  ngOnDestroy() {
    if (this.loadingStateSubscription)
    this.loadingStateSubscription.unsubscribe();
  }

}
