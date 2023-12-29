import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './views/auth/signup/signup.component';
import { LoginComponent } from './views/auth/login/login.component';
import { UserListComponent } from './views/main/userList/userList.component';
import { UserDetailsComponent } from './views/main/userDetails/userDetails.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch:"full" },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "users", component: UserListComponent },
  { path: "user/:id", component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
