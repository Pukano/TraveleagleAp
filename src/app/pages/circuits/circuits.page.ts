import { CircuitService, SearchType } from './../../services/circuit.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-circuits',
  templateUrl: './circuits.page.html',
  styleUrls: ['./circuits.page.scss'],
})
/**
This is the base class for circuit page
*/
export class CircuitsPage implements OnInit {
	results: Observable<any>;	//result data which are shown on page. Here are the downloaded Cicuits
	searchTerm: string = '';	//Search term to allow search in ceircuits. Default is empty to show all results
	type: SearchType = SearchType.all; //defined choosable search term. Default is all to show all results
	token:String;			//JWT Bearer access token variable

	constructor(private circuitService: CircuitService,private activatedRoute: ActivatedRoute, private storage: Storage) { }
	
	//tihs funcion is run as the first on initialization o page
	ngOnInit() {
		// Get the token from staorage and set the data into Results to be showed on page
		this.storage.get('accessToken').then((result) => {
			this.token = result;			
			this.results = this.circuitService.getAllCircuits(this.token);
		});
		
	}
	searchChanged() {
		// Call our service function which returns actualy searched data
		this.results = this.circuitService.searchData(this.searchTerm, this.type, this.token);
	}
	
}
