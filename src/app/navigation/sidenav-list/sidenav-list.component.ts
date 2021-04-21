import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit,OnDestroy {

  @Output() sidenavToggle = new EventEmitter();
  authState : Subscription;
  isAuth : boolean;


  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.authState = this.authService.authChange.subscribe(authStatus => this.isAuth=authStatus);
  }

  onToggleSidenav() {
      this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    if(this.authState)
      this.authState.unsubscribe();
  }

}
