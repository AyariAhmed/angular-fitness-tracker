import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class AuthService {

  private isAuthenticated : boolean = false;
  public authChange = new Subject<boolean>();

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }

  registerUser(authData: AuthData) {
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.authSuccessfully();
      })
      .catch(error => console.log(error));

  }

  login(authData: AuthData) {
   this.afAuth.signInWithEmailAndPassword(authData.email,authData.password)
     .then(result => {
       this.authSuccessfully();
     })
     .catch(console.log);

  }

  logout() {
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  /*getUser() {
    return {...this.user};
  }*/

  isAuth(){
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated =true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

}
