import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input('data') data: any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
  loggedIn() {
    return this.authService.authenticated();
  }

  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }

}
