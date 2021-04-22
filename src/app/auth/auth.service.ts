import {AuthData} from './auth-data.model';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {UiService} from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import {Store} from '@ngrx/store';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {


  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService : UiService,
              private store : Store<fromRoot.State>
              ) {
  }

  initAuthListener(){
    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      }else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.openSnackBar(error.message);
      });

  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.openSnackBar(error.message);
      });

  }

  logout() {
    this.afAuth.signOut();

  }





}
