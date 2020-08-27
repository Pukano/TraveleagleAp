import { Component, OnInit } from '@angular/core';
import { CircuitService } from './../../services/circuit.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';




@Component({
  selector: 'app-circuit-details',
  templateUrl: './circuit-details.page.html',
  styleUrls: ['./circuit-details.page.scss'],
})
export class CircuitDetailsPage implements OnInit {
	information = null;
	token = '';
	constructor(private activatedRoute: ActivatedRoute, private circuitService: CircuitService, private storage: Storage ) { }

	ngOnInit() {
		// Get the ID and Token that was passed with the URL
		let id = this.activatedRoute.snapshot.paramMap.get('id');
		this.storage.get('accessToken').then((result) => {
			console.log('token ', result);
			this.token = result;
			console.log('this token ', this.token);
			//this.information = this.circuitService.getCircuitDetails(id,this.token);
			this.circuitService.getCircuitDetails(id,this.token).subscribe(
				result => {
					console.log('response ',result );
					this.information = result ;
				},
				error => console.log('error',error)
			  );
		});
	
	}
	openWebsite() {
    window.open(this.information.Website, '_blank');
  }
	

}
