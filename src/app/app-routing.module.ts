import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './views/auth/signup/signup.component';
import { LoginComponent } from './views/auth/login/login.component';
import { UserListComponent } from './views/main/userList/userList.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch:"full" },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "users", component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
