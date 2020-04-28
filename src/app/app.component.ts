import { Component } from "@angular/core";
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: []
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
