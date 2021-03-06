import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

import { AuthService } from "./auth.service";

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(
    private auth: AuthService, 
    private router: Router
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean> {
    const user = await this.auth.getAFUser()
    const loggedIn = !!user

    if (!loggedIn) {
      this.router.navigate(["/"])
    }

    return loggedIn
  }
}
