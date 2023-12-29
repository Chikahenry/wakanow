import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-userList',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css']
})
export class UserListComponent implements OnInit {
  users!: any[]; // Define user array
  loginUser: string = ""
  user!: User;
  constructor(private router: Router, private data: DataService) {}

  updateForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  ngOnInit(): void {
    this.loginUser = sessionStorage.getItem('loggedInUserEmail') ?? ""
    this.getAllUsers();
  }
  logout(){
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }

  getAllUsers() {
    this.users = this.data.getAllUsers()
  }

  approveUser(user: User){
    const index = this.users.indexOf(user);
    if(this.loginUser == "admin@gmail.com" && index != 1){
      alert('User successfully Approved')
    }
    let res = this.data.approveUser(user)
    if(res == true){
      alert('User successfully Approved')
        this.router.navigate(['/users'])
      }else{
      alert('An error occured')
    }
  } 

  updateUserModal(user: User){
    this.updateForm = new FormGroup({
      firstName: new FormControl(user.firstName, Validators.required),
      lastName: new FormControl(user.lastName, Validators.required),
      email: new FormControl(user.email, Validators.required),
      password: new FormControl(user.password, Validators.required)
    })
    this.user = user
    document.getElementById('popModal')?.click()
  }
  updateUser(){
    let email = this.updateForm.get("email")?.value ?? "";
    let password = this.updateForm.get("password")?.value ?? "";
    let firstName = this.updateForm.get("firstName")?.value ?? "";
    let lastName = this.updateForm.get("lastName")?.value ?? "";
     
    let user: User = {
      id: this.user.id,
      email: email,
      password: password,
      firstName: firstName,
      lastName:lastName,
      tempKey: this.user.tempKey,
      createdBy: this.user.createdBy,
      role: this.user.role,
      dateCreated: this.user.dateCreated
    }
    let res = this.data.updateUser(user)
    if(res == true){
      alert('User successfully updated')
        this.router.navigate(['/users'])
      }else{
      alert('An error occured')
    }
  }

  deleteUser(user: User) {
    if (window.confirm('Are you sure you want to delete ' + user.firstName + ' ' + user.lastName + ' ?')) {
     let res = this.data.deleteUser(user);
      if(res == true){
        alert('User successfully deleted')
        this.router.navigate(['/users'])
      }else{
        alert('An error occured')
      }
    }
  }
}
