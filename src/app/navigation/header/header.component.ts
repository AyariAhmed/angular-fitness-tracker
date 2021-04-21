import {Component, EventEmitter, OnInit, Output , OnDestroy} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit ,OnDestroy{

  @Output() sidenavToggle = new EventEmitter();
  authState : Subscription;
  isAuth : boolean;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.authState = this.authService.authChange.subscribe(authStatus => this.isAuth=authStatus);
  }

  onToggleSideNav() {
      this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    if(this.authState)
    this.authState.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
