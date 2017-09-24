import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { ToastsManager } from 'ng2-toastr';
import { UserData } from './admin/admin.service';
import myGlobals = require('./globals');

@Injectable()
export class AuthService {
	baseUrl: string;
	isLoggedIn: boolean = false;
	isRegistered: boolean = false;
	userName: string;
	token: string;
	tokenType: string;
	tokenExpiresIn: string;
	tokenExpiresOn: string;
	userInfo: UserData;
	hasAdminRole: boolean;

	// store the URL so we can redirect after logging in
	redirectUrl: string;

	constructor(
		private _http: Http,
		private toastr: ToastsManager) {
		this.baseUrl = myGlobals.baseApiUrl;
		this.userInfo = new UserData();
	}

    // Login using Fake Authentication by assigning isLoggedIn = true
	loginOld(): Observable<boolean> {
		return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
	}

    // Login using ASP.NET Identity utilizing /Token Authentication
	login(userName: string, password: string) {
		let url = this.baseUrl + 'token';
		let bodyString = 'grant_type=password&username=' + encodeURIComponent(userName) + '&password=' + encodeURIComponent(password);
		let options = new RequestOptions({ headers: this.getLoginHeaders(), method: 'post' });

		return this._http.post(url, bodyString, options)
			.map(res => {
               	let user = res.json();
				if (user && user.access_token) {
					// store user details and jwt token in local storage to keep user logged in between page refreshes
					localStorage.setItem("currentUser", JSON.stringify(user));
				}
				this.token = res.json()["access_token"];
				this.tokenExpiresIn = res.json()["expires_in"];
				this.tokenType = res.json()["token_type"];
				this.tokenExpiresOn = res.json()[".expires"];
				this.userName = res.json()["userName"];
				this.isLoggedIn = true;
			})
			.catch(this.handleError);
	}

	// Login using ASP.NET Identity utilizing /Token Authentication
	register(userName: string, password: string, confirmPassword: string): Observable<boolean> {
		let url = this.baseUrl + 'api/Account/Register';
		let bodyString = `{"Email": "${userName}", "Password": "${password}",  "ConfirmPassword": "${confirmPassword}" };`;
		let options = new RequestOptions({ headers: this.getHeaders(), method: 'post' });

		this._http.post(url, bodyString, options)
			.subscribe(res => {
				this.isRegistered = true;
			},
			error => {
				this.isRegistered = false;
				console.log(error.text());
				this.handleError(error);
			});

		return Observable.of(this.isLoggedIn).delay(1000);
	}

	setUserInfo(objUserInfo: UserData) {
		this.userInfo = objUserInfo;
	}

	isAdmin() {
		let hasAdminRole = false;
		if (this.isLoggedIn && this.userInfo.Roles)
		{
			if (this.userInfo.Roles.indexOf("Admin") >= 0) {
				hasAdminRole = true;
			}
		}
		return hasAdminRole;
	}

    // Logout
	logout(): void {
        // remove user from local storage to log user out
		localStorage.removeItem("currentUser");

		this.isLoggedIn = false;
		this.token = null;
		this.tokenExpiresIn = null;
		this.tokenExpiresOn = null;
		this.tokenType = null;
		this.userName = null;
	}

    // Get header parameters for HTTP request
	getLoginHeaders() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return headers;
	}

    // Get header parameters for HTTP request
	getHeaders() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return headers;
	}
    // Handle Errors
	handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error || '';
			const err = JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		//console.error(errMsg);
		return Observable.throw(errMsg);
	}

}
