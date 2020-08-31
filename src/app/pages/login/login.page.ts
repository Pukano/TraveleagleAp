import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from './../../services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AuthService]
})
export class LoginPage implements OnInit {
	login;

  constructor(private authService: AuthService, private router: Router, private storage: Storage ) { }

  ngOnInit() {
	 //init variables with empty values 
	this.storage.set('accessToken', '');
	this.storage.set('refreshToken', '');
	this.login = {
		username: '',
		password: ''
	};	  
  }
  //Method for login
  loginUser(form) {
	  this.login.username = form.value.username;
	  this.login.password = this.authService.passwordHash(form.value.password);
	  this.authService.loginUser(this.login).subscribe(
		response => {
			if(response.access){
				this.storage.set('accessToken', response.access);
				this.storage.set('refreshToken', response.refresh);
				this.router.navigateByUrl('circuits/');
			}
			else {		
				alert('Bad username or password for ' + this.login.username + ' !');			
				console.log('response ', response);
			}
		},
		error => console.log('error',error)
	  );
  }

}
