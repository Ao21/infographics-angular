import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  lock = new Auth0Lock('S3XyFnffaACNaNsN0wEfcmxLKUlNSPC5', 'un-infographics.eu.auth0.com');
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;

  constructor(private authHttp: AuthHttp, zone: NgZone, private router: Router) {
    this.zoneImpl = zone;
    this.user = JSON.parse(localStorage.getItem('profile'));
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.showSignin({}, (err, profile, token) => {
      if (err) {
        alert(err);
        return;
      }
      // If authentication is successful, save the items
      // in local storage
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', token);
      this.zoneImpl.run(() => this.user = profile);
      this.router.navigate(['countries']);
    });
  }

  public logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.zoneImpl.run(() => this.user = null);
    this.router.navigate(['/']);
  }

}
