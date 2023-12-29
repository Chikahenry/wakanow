import { Injectable } from '@angular/core';
import {Role, User} from "../models/users";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})

export class DataService {
 users: User[] = [];
 userObj: User = {
  id: 1,
  tempKey: "awsedrtfgyuhjikji87",
  email: "adminwakanow@gmail.com",
  createdBy: "admin@gmail.com",
  firstName: "Admin",
  dateCreated: new Date,
  lastName: "wakanow",
  role: Role.User,
  password: "password"
}
 characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  constructor() {
    this.users.push(this.userObj)
    this.SetUserSession(this.users)
   }

  SetUserSession(userData: any) {
    sessionStorage.setItem("userData", JSON.stringify(userData))
  }
  getUserSession() {
    let sessionString = sessionStorage.getItem("userData")??"";
     return JSON.parse(sessionString || "");
  }
  // add User
  addUser(user : User) {
    this.users = this.getUserSession()
    this.users.push(user)
    this.SetUserSession(this.users)
    return true
  }

  generateString(length: number) {
      let result = ' ';
      const charactersLength = this.characters.length;
      for ( let i = 0; i < length; i++ ) {
          result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
      }
  
      return result;
  }

  approveUser(user: User){
    this.users = this.getUserSession()
    for(let i = 0; i < this.users.length; i++){
      if(user.email == this.users[i].email){
      this.users[i].role = Role.Admin
      this.users[i].tempKey = this.generateString(20)
      this.SetUserSession(this.users)
      return true
      }
    };
    return false
  }

  // get all Users
  getAllUsers() {
    return this.getUserSession()
  }

  // delete User
  deleteUser(user : User) {
    this.users = this.getUserSession()
    for(let i = 0; i < this.users.length; i++){
      if(user.email == this.users[i].email){
      const index = this.users.indexOf(this.users[i]);
      this.users.splice(index, 1);
      this.SetUserSession(this.users)
      return true
      }
    };
    
    return false
  }

  // update User
  updateUser(user : User) {
    this.users = this.getUserSession()
    for(let i = 0; i < this.users.length; i++){
      if(user.email == this.users[i].email){
      this.users[i] = user
      this.SetUserSession(this.users)
      return true
      }
    };
    return false
  }
    
}
