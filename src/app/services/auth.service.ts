import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://traveleagle.pythonanywhere.com/';
  
  constructor(private http: HttpClient) { }
  
  registerUser(userData){
	  let url = `${this.baseUrl}auth/users/`;
	 let data = JSON.stringify(userData);
	 
	  console.log('data ',data);
	  const httpOptions = {
		  headers: new HttpHeaders({
			'Content-Type':  'application/json'
		  })
		};
	  return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!
      console.log("on appelle BACKEND encoded url " + url);
      this.http.post(url,data, httpOptions)
        .pipe(retry(1))
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        }, error => {
          observer.next();
          observer.complete();
          console.log(error);// Error getting the data
        });
    });
  }
    loginUser(userData){
	  console.log('data ',userData);
	  let url = `${this.baseUrl}api/auth/token/`;
	  let data = {
            "username": userData.username,
			"password": userData.password
        };
	  const options = {
      headers: new HttpHeaders({
        //'Authorization': 'Bearer ' + this.tokenSSO,
        'Content-Type': 'application/json'
      })
    }; 
	  /*let result = this.http.post(url,
	  {
			"username": userData.username,
			"password": userData.password
		});*/
	  //console.log('result ',result);
	  
	  return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!
      console.log("on appelle BACKEND encoded url " + url);
      this.http.post(url,userData, options)
        .pipe(retry(1))
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        }, error => {
          observer.next();
          observer.complete();
          console.log(error);// Error getting the data
        });
    });
  }
}
