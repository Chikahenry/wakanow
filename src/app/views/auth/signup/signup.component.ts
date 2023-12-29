import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role, User } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { CustomValidators } from 'src/app/utils/passwordValidate.directive';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // signupForm!: FormGroup;
  userObj: User = {
    id: 0,
    email: "",
  tempKey: "",
  createdBy: "",
    firstName: "",
    dateCreated: new Date,
    lastName: "",
    role: Role.User,
    password: ""
  }
  signupForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })
  loggedInUser: string | null;

  constructor(private data: DataService, private router: Router, private authService: AuthService) {
    this.loggedInUser = sessionStorage.getItem('loggedInUserEmail')
  }

  ngOnInit(): void {
  }

  register() {
    if(this.signupForm.invalid){
      alert('Fill all input fields');
      return 
    }
    let email = this.signupForm.get("email")?.value ?? "";
    let password = this.signupForm.get("password")?.value ?? "";
    let firstName = this.signupForm.get("firstName")?.value ?? "";
    let lastName = this.signupForm.get("lastName")?.value ?? "";
    
    let id = Math.floor(Math.random() * 100) + 2;
    this.userObj.id = id;
    this.userObj.email = email;
    this.userObj.password = password;
    this.userObj.firstName = firstName;
    this.userObj.lastName = lastName;
    this.userObj.dateCreated = new Date;
    this.userObj.createdBy = this.loggedInUser;
    this.userObj.role = Role.User;
    this.userObj.tempKey = ""

    this.data.addUser(this.userObj);
     
    this.authService.signUp(email, password).then( res => {
      alert('Registration Successful');
      
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/signup']);
    })
  }

}
