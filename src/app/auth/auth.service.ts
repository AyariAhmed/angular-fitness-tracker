import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';

@Injectable()
export class AuthService {

  private isAuthenticated: boolean = false;
  public authChange = new Subject<boolean>();

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService) {
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
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
      })
      .catch(error => console.log(error));

  }

  login(authData: AuthData) {
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
      })
      .catch(console.log);

  }

  logout() {
    this.afAuth.signOut();

  }

  /*getUser() {
    return {...this.user};
  }*/

  isAuth() {
    return this.isAuthenticated;
  }



}
