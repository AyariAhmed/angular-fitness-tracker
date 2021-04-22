import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Observable, Subscription} from 'rxjs';
import * as fromRoot from '../../app.reducer'
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit{

  @Output() sidenavToggle = new EventEmitter();
  authState : Subscription;
  isAuth$ : Observable<boolean>;


  constructor(private authService : AuthService,private store : Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav() {
      this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }



}
