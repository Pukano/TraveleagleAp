import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

/**
	Definition of choosable search types option.
*/
export enum SearchType {
	all = '',
	all_inclusive = 'All inclusive',
	petit_dejeuner = 'Petit déjeuner'
}
@Injectable({
  providedIn: 'root'
})
/**
	Circuit API class for data requesting
*/
export class CircuitService {
	baseUrl = 'http://traveleagle.pythonanywhere.com/travelegg/';
	
	constructor(private http: HttpClient) { }
	/**
		This method does Rest get request to url with token.
	*/
	doGetRequest(url,token):Observable<any>{
		const httpOptions = {
			headers: new HttpHeaders({
			'Content-Type':  'application/json',
			'Authorization': 'Bearer ' + token
			})
		};
		return Observable.create(observer => {
			this.http.get(url, httpOptions).pipe(retry(1)).subscribe(res => {
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
	This method  do angular RestAPI call to baseUrl to get all circuits
	to Get all Circuits
  */
    getAllCircuits(token): Observable<any> {
	let apiCirrcuit='api_circuit/';
	let url = `${this.baseUrl}${apiCirrcuit}`;
	return this.doGetRequest(url,token);
  }
  /**
	This method  do angular RestAPI call to get circuit detail
	example request: Get http://traveleagle.herokuapp.com/API/?id=1&token=ASD514561456sad145sadasS
  */
    getCircuitDetails(id,token) {
	let apiCircuit='api_circuit/';
	let url = `${this.baseUrl}${apiCircuit}/${id}`;
	return this.doGetRequest(url,token);
	
  }

  /**
	this method is used to do search on data by search term and search type
  */
  searchData(searchTerm: string, type: SearchType, token): Observable<any> {
	let allCircuits = this.getAllCircuits(token);	//get all circuits
	//search filter by Type
	let filteredCircuits = allCircuits.pipe(	
		map((reports: any[]) => reports.filter(p => {
			if (p.nourriture.indexOf(type) > -1) {				
				return p; 
			}
		}))
	);
	//search filter by search term
	if(searchTerm.length > 0){
		filteredCircuits = filteredCircuits.pipe(
			map((circuitsArray: any[]) => circuitsArray.filter(
				circuit => {
					if (circuit.destination.toLowerCase().includes(searchTerm.toLowerCase())) {				
						return circuit; 
					}
				}
			))
		);
	}
	return filteredCircuits;
  }
  
  
  
}
