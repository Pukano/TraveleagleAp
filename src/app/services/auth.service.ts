import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://traveleagle.pythonanywhere.com/';
  
  constructor(private http: HttpClient) { }
  doPostRequest(url, data){
	  const httpOptions = {
	  headers: new HttpHeaders({
		'Content-Type':  'application/json'
	  })
	};
	return Observable.create(observer => {
      this.http.post(url,data, httpOptions).pipe(retry(1)).subscribe(res => {
          observer.next(res);
          observer.complete();
        }, error => {
          observer.next(error);
          observer.complete();
          console.log(error);// Error getting the data
        });
    });
  }
  //Registration API
  registerUser(userData){
	let url = `${this.baseUrl}auth/users/`;
	let data = JSON.stringify(userData);
	 
	return this.doPostRequest(url,data);
  }
  //LOGIN API
    loginUser(userData){
	  let url = `${this.baseUrl}api/auth/token/`;
	  let data = {
            "username": userData.username,
			"password": userData.password
        };
	  return this.doPostRequest(url, data);
  }
  //Function for password Hashing
  passwordHash(password){
	  let crypted = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
	  return crypted; 
  }
}
