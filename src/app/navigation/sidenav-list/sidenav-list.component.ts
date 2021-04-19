import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter();
  authState : Subscription;
  isAuth : boolean;


  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  onToggleSidenav() {
      this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }
}
