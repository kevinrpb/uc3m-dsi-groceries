import { Component } from "@angular/core";
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: []
})

export class HomeComponent {

  constructor(
    public auth: AuthService
  ) {}

}
