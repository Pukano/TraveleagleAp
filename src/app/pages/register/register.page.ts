import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	register;

  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit() {
	  this.register = {
		  username: '',
		  password: '',
		  email: ''
	  };
  }
  registerUser(form) {
	  console.log("form ",form.value);
	  this.register.username = form.value.username;
	  this.register.email = form.value.email;
	  this.register.password = form.value.password;
	  this.authService.registerUser(this.register).subscribe(
		response => {
			alert('User' + this.register.username + ' has been created!');
			this.router.navigateByUrl('login');
		},
		error => console.log('error',error)
	  );
  }

}
