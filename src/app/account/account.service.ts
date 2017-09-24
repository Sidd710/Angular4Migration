/* ------------------------------------------------------------
 * Created By	: CodeBhagat 1.0
 * Created Date	: 4/2/2017
 * Service Name	: CategoriesService
 * Purpose		: This service contains methods to perform Data Access Layer operations using Http/Web API calls
 * Instructions	: You may modify code inside code generation template and re-generate the code.
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import myGlobals = require('../globals');

/*
"Id":"a61faddc-1aed-49cf-86d3-d7946ff36247",
"UserName":"user@gmail.com",
"Email":"user@gmail.com",
"FirstName":"User",
"LastName":"CodeBhagat",
"Address":null,
"City":null,
"State":null,
"PostalCode":null,
"PhoneNumber":null,
"Roles":"User"},
*/
export class UserData {
	public Id: string;
	public UserName: string;
	public Email: string;
	public FirstName: string;
	public LastName: string;
	public Address: string;
	public City: string;
	public State: string;
	public PostalCode: string;
	public PhoneNumber: string;
	public Roles: string;
}

export class RoleData {
	public Id: string;
	public Name: string;
	public Description: string;
}

export class ChangePasswordData {
	oldPassword: string = "";
	newPassword: string = "";
	confirmPassword: string = "";
}

export class ResetPasswordData {
	email: string = "";
	token: string;
	newPassword: string = "";
	confirmPassword: string = "";
}

export class ForgotPasswordData {
	email: string = "";
}

@Injectable()
export class AccountService {
    baseUrl: string;

    constructor(private _http: Http) {
	    this.baseUrl = myGlobals.baseApiUrl;
    }

	getUserByID(id: string): Observable<UserData> {
		let url = `${this.baseUrl}api/Admin/User/Profile?id=${id}`;

        return this._http
			.get(url, {headers: this.getHeaders()})
            .map(response => response.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    getUserByUserName(userName: string): Observable<UserData> {
        let url = `${this.baseUrl}api/Account/Profile?userName=${userName}`;

        return this._http
            .get(url, { headers: this.getHeaders() })
            .map(response => response.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    changePassword(oldPassword: string, password: string, confirmPassword: string) {
		let bodyString = `{  "OldPassword": "${oldPassword}",  "NewPassword": "${password}", "ConfirmPassword": "${confirmPassword}"}` // Stringify payload
        let options = new RequestOptions({ headers: this.getHeaders(), method: 'post' });
		let url = this.baseUrl + 'api/Account/ChangePassword';
 
		return this._http.post(url, bodyString, options)
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    resetPassword(email: string, password: string, code: string) {
		let bodyString = `{  "Email": "${email}",  "Password": "${password}", "Token": "${code}"}` // Stringify payload
        let options = new RequestOptions({ headers: this.getHeaders(), method: 'post' });
		let url = this.baseUrl + 'api/Account/ResetPassword';
 
		return this._http.post(url, bodyString, options)
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    forgotPassword(email: string) {
		let bodyString = `{  "Email": "${email}"}` // Stringify payload
        let options = new RequestOptions({ headers: this.getHeaders(), method: 'post' });
		let url = this.baseUrl + 'api/Account/ForgotPassword';
 
		return this._http.post(url, bodyString, options)
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.access_token) {
			headers.append('Authorization', 'Bearer ' + currentUser.access_token);
        }
        return headers;
    }

    private extractData(res: Response) {
        let body: any;

        // check if empty, before call json
        if (res.text()) {
            body = res.json();
        }
        return body || { };
    }

    handleError(error: Response | any) {
        let errMsg: string;
		if (error instanceof Response) {
		const body = error.json() || '';
		const err = body.error || JSON.stringify(body);
		errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
		errMsg = error.message ? error.message: error.toString();
		}
		//console.error(errMsg);
		return Observable.throw(errMsg);
	}
}
