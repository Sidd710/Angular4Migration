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
import { Observable } from 'rxjs/Observable';
import myGlobals = require('../globals');

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

@Injectable()
export class AdminService {
    baseUrl: string;
    
    constructor(private _http: Http) {
        this.baseUrl = myGlobals.baseApiUrl;
    }

    getAllUsers(): Observable<UserData[]> {
        let url = this.baseUrl + 'api/Admin/Users';

        return this._http
            .get(url, { headers: this.getHeaders() })
            .map(response => response.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    getAllRoles(): Observable<RoleData[]> {
        let url = this.baseUrl + 'api/Admin/Roles';

        return this._http
            .get(url, { headers: this.getHeaders() })
            .map(response => response.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    getUserByUserName(userName: string): Observable<UserData> {
        let url = `${this.baseUrl}api/Admin/User?userName=${userName}`;

        return this._http
            .get(url, { headers: this.getHeaders() })
            .map(response => response.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    getUserByID(id: string): Observable<UserData> {
        let url = `${this.baseUrl}api/Admin/User/${id}`;

        return this._http
            .get(url, { headers: this.getHeaders() })
            .map(response => response.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    getRoleByID(id: string): Observable<RoleData> {
        let url = `${this.baseUrl}api/Admin/Role/${id}`;

        return this._http
            .get(url, { headers: this.getHeaders() })
            .map(response => response.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    addUser(body: UserData): Observable<UserData> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let options = new RequestOptions({ headers: this.getHeaders(), method: 'post' });
        let url = this.baseUrl + 'api/Admin/User/Create';

        return this._http.post(url, bodyString, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    addRole(body: RoleData): Observable<RoleData> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let options = new RequestOptions({ headers: this.getHeaders(), method: 'post' });
        let url = this.baseUrl + 'api/Admin/Role/Create';

        return this._http.post(url, bodyString, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateUser(body: UserData): Observable<UserData> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let options = new RequestOptions({ headers: this.getHeaders(), method: 'put' });
        let url = this.baseUrl + 'api/Admin/User/Update';

        return this._http.put(url, bodyString, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateRole(body: RoleData): Observable<RoleData> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let options = new RequestOptions({ headers: this.getHeaders(), method: 'put' });
        let url = this.baseUrl + 'api/Admin/Role/Update';

        return this._http.put(url, bodyString, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteUser(id: string): Observable<Object> {
        let url = `${this.baseUrl}api/Admin/User/Delete?id=` + id;

        return this._http.delete(url)
            .map(res => res)
            .catch(this.handleError);
    }

    deleteRole(id: string): Observable<Object> {
        let url = `${this.baseUrl}api/Admin/Role/Delete/${id}`;

        return this._http.delete(url)
            .map(res => res)
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
        return body || {};
    }

    handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
