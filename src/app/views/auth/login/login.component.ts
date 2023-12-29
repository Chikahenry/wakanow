import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  })
  constructor(private authservice: AuthService, private router : Router) { }

  // login method
  async login() {
    if(this.loginForm.invalid){
      alert('All fields are Required');
      return
    }
    let email = this.loginForm.get("email")?.value ?? "";
    let password = this.loginForm.get("password")?.value ?? "";
   
    this.authservice.signIn(email,password).then( res => {
      sessionStorage.setItem('loggedInUserEmail', email)
      this.router.navigate(['/users']);
        
      }, err => {
        alert(err.message);
        return
      })
  }
  ngOnInit() {
  }

}
