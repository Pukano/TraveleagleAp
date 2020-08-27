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
	  
	this.storage.set('accessToken', 'aa');
	this.storage.set('refreshToken', 'ee');
	  this.login = {
		  username: '',
		  password: ''
	  };
	  
  }
  loginUser(form) {
	  console.log("form ",form.value);
	  this.login.username = form.value.username;
	  this.login.password = form.value.password;
	  this.authService.loginUser(this.login).subscribe(
		response => {
			console.log('response ',response);
			console.log('acces token ',response.access);
			this.storage.set('accessToken', response.access);
			this.storage.set('refreshToken', response.refresh);
			this.router.navigateByUrl('circuits/');
		},
		error => console.log('error',error)
	  );
  }

}
