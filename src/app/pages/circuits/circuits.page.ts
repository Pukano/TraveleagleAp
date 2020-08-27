import { CircuitService, SearchType } from './../../services/circuit.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-circuits',
  templateUrl: './circuits.page.html',
  styleUrls: ['./circuits.page.scss'],
})
export class CircuitsPage implements OnInit {
	results: Observable<any>;
	searchTerm: string = '';
	type: SearchType = SearchType.all;
	token:String;

	constructor(private circuitService: CircuitService,private activatedRoute: ActivatedRoute, private storage: Storage) { }
	

	ngOnInit() {
		//console.log('params ',this.activatedRoute.snapshot.paramMap);
		this.storage.get('accessToken').then((result) => {
			console.log('token ', result);
			this.token = result;
			
			console.log('this token ', this.token);
			this.circuitService.getAllCircuits(this.token).subscribe();
			this.results = this.circuitService.getAllCircuits(this.token);
			console.log('data ',this.results);
			this.circuitService.getAllCircuits(this.token).subscribe(
				response => {
					console.log('response ',response);
		
				},
				error => console.log('error',error)
			  );
		});
		
	}
	getCircuits(){
		// Call our service function which returns an Observable
		this.results = this.circuitService.getAllCircuits(this.token);
	}
	searchChanged() {
		// Call our service function which returns an Observable
		this.results = this.circuitService.getAllCircuits(this.token);//this.circuitService.searchData(this.searchTerm, this.type);
	}
}
