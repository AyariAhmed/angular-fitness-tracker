import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('sidenav') sidenav;

  constructor(private authService:AuthService) {
  }

  toggleSidenav(){
    this.sidenav.toggle();
  }

  ngOnInit() {
    this.authService.initAuthListener();
  }
}
