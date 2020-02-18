import { Component } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: []
})
export class ProfileComponent {
  constructor(public auth: AuthService) {}
}
