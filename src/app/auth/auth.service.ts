import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {UiService} from '../shared/ui.service';

@Injectable()
export class AuthService {

  private isAuthenticated: boolean = false;
  public authChange = new Subject<boolean>();

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService : UiService
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
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.openSnackBar(error.message);
      });

  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
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
