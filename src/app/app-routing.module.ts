import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedGuard } from './core/auth/logged.guard';
import { NotLoggedGuard } from './core/auth/not-logged.guard';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [NotLoggedGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NotLoggedGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'list/:id',
    component: ListComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
