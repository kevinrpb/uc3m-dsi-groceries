import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: []
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.completeFirstLogin()
      .catch(error => {
        throw new Error(`Couldn't complete first login. Got: ${error}`);
      })
  }

}
