import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {UiService} from '../shared/ui.service';
import * as fromApp from '../app.reducer';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthService {

  private isAuthenticated: boolean = false;
  public authChange = new Subject<boolean>();

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService : UiService,
              private store : Store<{ui : fromApp.State}>
              ) {
  }

  initAuthListener(){
    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      }else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type : 'START_LOADING'});
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({type : 'STOP_LOADING'});
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({type : 'STOP_LOADING'});
        this.uiService.openSnackBar(error.message);
      });

  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type : 'START_LOADING'});
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({type : 'STOP_LOADING'});
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({type : 'STOP_LOADING'});
        this.uiService.openSnackBar(error.message);
      });

  }

  logout() {
    this.afAuth.signOut();

  }
  isAuth() {
    return this.isAuthenticated;
  }




}
