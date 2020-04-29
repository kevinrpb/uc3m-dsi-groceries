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

  public visible: boolean

  constructor(
    public auth: AuthService,
    public app: AppComponent,
    public router: Router
  ) {}

  public loginForm = new FormGroup({
    email:    new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  public get email()    { return this.loginForm.get('email')     }
  public get password() { return this.loginForm.get('password')  }

  public login (form: any) {
    this.auth.emailPasswordSignIn(form)
      .then(_ => {
        this.router.navigate(["/home"])
      })
      .catch((error: Error) => {
        // TODO: Handle the error
        throw error;
      })
  }

  public googleLogin () {
    this.auth.googleSignin()
      .then(_ => {
        this.router.navigate(['/home'])
      })
      .catch(error => {
        console.log(error)
      })
  }

  public goSignup () {
    this.router.navigate(['/signup'])
  }

}
