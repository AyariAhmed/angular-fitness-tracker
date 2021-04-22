import {Component, EventEmitter, OnInit, Output } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import * as fromRoot from '../../app.reducer'
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Output() sidenavToggle = new EventEmitter();
  isAuth$ : Observable<boolean>;

  constructor(private authService : AuthService,private store : Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSideNav() {
      this.sidenavToggle.emit();
  }


  onLogout() {
    this.authService.logout();
  }
}
