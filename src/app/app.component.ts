import { Component, ViewContainerRef } from '@angular/core';
import {
	Router,
	NavigationExtras
} from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

import { ApiService } from './shared';
import { AuthService }      from './auth.service';

// import '../style/app.scss';
import '../style/styles.css';
import '../style/Site.css';
import '../style/sidebar.css';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  message: string;
  url = 'http://www.codebhagat.com/';
  userName: string;

  constructor(
    public authService: AuthService, 
    public router: Router, 
    private api: ApiService,
    private toastr: ToastsManager,
    vRef: ViewContainerRef) {
    this.setMessage();
    this.toastr.setRootViewContainerRef(vRef);
    // Do something with api
  }

  getUserName() {
    return this.authService.userName;
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  logout() {
    this.toastr.success('Thank You ' + this.authService.userName + '!', 'Signout');
    this.authService.logout();
    // Redirect the user
    this.router.navigate(['/home']);
  }
}
