import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {UiService} from '../../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit ,OnDestroy {

  maxDate: Date;
  hide : Boolean = true;
  isLoading : boolean = false;
  private loadingStateSubscription : Subscription;

  constructor(private authService : AuthService,private uiService :UiService) { }

  ngOnInit(): void {
    this.loadingStateSubscription = this.uiService.loadingStateChanged.subscribe(state => this.isLoading=state);

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 16);
  }

  submitForm(f: NgForm) {
    const formValues  = f.form.value;
    const {email,password} = formValues;
    this.authService.registerUser({email,password});
  }

  ngOnDestroy() {
    if(this.loadingStateSubscription)
    this.loadingStateSubscription.unsubscribe();
  }
}
