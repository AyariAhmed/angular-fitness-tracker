import {Component,  OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  hide : Boolean = true;
  isLoading$ : Observable<boolean>;
  private loadingStateSubscription : Subscription;

  constructor(
    private authService : AuthService,
    private uiService :UiService,
    private store : Store<{ui : fromApp.State}>
    ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    // this.loadingStateSubscription = this.uiService.loadingStateChanged.subscribe(state => this.isLoading=state);
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required])
    });
  }

  onSubmit() {
    const {email,password} = this.loginForm.value;
    this.authService.login({email,password});
  }
 /* ngOnDestroy() {
    if (this.loadingStateSubscription)
    this.loadingStateSubscription.unsubscribe();
  }
*/
}
