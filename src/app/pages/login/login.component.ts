import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private auth: AuthService,
    private app: AppComponent,
    private router: Router
  ) {}

  private loginForm = new FormGroup({
    email:    new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  private get email()    { return this.loginForm.get('email')     }
  private get password() { return this.loginForm.get('password')  }

  private login (form: any) {
    
  }

  private googleLogin () {
    this.auth.googleSignin()
      .then(_ => {
        this.router.navigate(['/home'])
      })
      .catch(error => {
        console.log(error)
      })
  }

  private goSignup () {
    this.router.navigate(['/signup'])
  }

}
