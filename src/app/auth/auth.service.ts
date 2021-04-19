import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';

export class AuthService{
  private user : User;

  authChange = new Subject<boolean>();

  registerUser(authData : AuthData){
    this.user = {
      email : authData.email,
      userId : Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
  }

  login(authData : AuthData){
    this.user = {
      email : authData.email,
      userId : Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
  }

  logout(){
    this.user = null;
    this.authChange.next(false);
  }

  getUser(){
    return {...this.user};
  }

  isAuth(){
    return this.user != null;
  }

}
