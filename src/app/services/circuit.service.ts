import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

export enum SearchType {
	all = '',
	Sunchine = 'Sunchine',
	Alone = 'Alone',
	Dream = 'Dream' 
}

@Injectable({
  providedIn: 'root'
})
/**
	Circuit API class for data requesting
*/
export class CircuitService {
	baseUrl = 'http://traveleagle.pythonanywhere.com/travelegg/';
	//token='';
	constructor(private http: HttpClient) { }
  /**
	This method  do angular RestAPI call for retrieving auth token
	example request: Get http://traveleagle.herokuapp.com/API/?id=1&token=ASD514561456sad145sadasS
  
    getLoginToken(username,password) {
	let tokenUrl = 'auth/token/';
	let url = `${this.baseUrl}${tokenUrl}?username=${username}&password=${password}`;
	console.log('Request url',url);
    let request= this.http.get(url);
	console.log('Get token for: ', username);
	console.log('token ', request);
	return request;
  }*/
  /**
	This method  do angular RestAPI call to baseUrl with parameter token 
	to Get all Circuits
  */
    getAllCircuits(token): Observable<any> {
		console.log('token to auth','JWT '+token);
	let apiCirrcuit='api_circuit/';
	let url = `${this.baseUrl}${apiCirrcuit}`;
	const httpOptions = {
		headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Authorization': 'Bearer ' + token
		})
	};
	console.log('header',httpOptions);
	  return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!
      console.log("on appelle BACKEND encoded url " + url);
      this.http.get(url, httpOptions)
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
  /**
	This method  do angular RestAPI call to baseUrl with parameter id and token
	example request: Get http://traveleagle.herokuapp.com/API/?id=1&token=ASD514561456sad145sadasS
  */
    getCircuitDetails(id,token) {
	let apiCircuit='api_circuit/';
	let url = `${this.baseUrl}${apiCircuit}/${id}`;
	console.log('request to:',url);
	const httpOptions = {
		headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Authorization': 'Bearer ' + token
		})
	};
	console.log('header',httpOptions);
	  return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!
      console.log("on appelle BACKEND encoded url " + url);
      this.http.get(url, httpOptions)
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
  
  searchData(title: string, type: SearchType): Observable<any> {
	let apiCirrcuit='api_cirrcuit/';
	let url = '${this.baseUrl}/';
	return this.http.get(url).pipe(
      map(results => {
		  console.log('data: ',results);
		  return results['Search'];
	  })
    );
  }
  
  
}
