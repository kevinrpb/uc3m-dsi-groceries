import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';

import { LoggedGuard } from './core/auth/logged.guard';
import { NotLoggedGuard } from './core/auth/not-logged.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [NotLoggedGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
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
