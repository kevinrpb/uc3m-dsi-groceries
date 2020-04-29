import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public visible: boolean
  public visible_: boolean

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  public signupForm = new FormGroup({
    email:        new FormControl('', [Validators.required, Validators.email]),
    password:     new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm_pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name:         new FormControl('', [Validators.required, Validators.pattern('([a-zA-ZáéíóúÁÉÍÓÚ]+[ ]?)+')]),
    last_name:    new FormControl('', [Validators.required, Validators.pattern('([a-zA-ZáéíóúÁÉÍÓÚ-]+[ ]?)+')]),
    birthdate:    new FormControl('', [Validators.required]),
    weight:       new FormControl('', [Validators.required, Validators.pattern('[1-9][0-9]*')]),
    height:       new FormControl('', [Validators.required, Validators.pattern('[0-9](.)[0-9]{2}')]),
  })

  public get email()         { return this.signupForm.get('email')         }
  public get password()      { return this.signupForm.get('password')      }
  public get confirm_pass()  { return this.signupForm.get('confirm_pass')  }
  public get name()          { return this.signupForm.get('name')          }
  public get last_name()     { return this.signupForm.get('last_name')     }
  public get birthdate()     { return this.signupForm.get('birthdate')     }
  public get weight()        { return this.signupForm.get('weight')        }
  public get height()        { return this.signupForm.get('height')        }

  public signup(form: any) {
    this.auth.emailPasswordSignUp(form)
      .then(_ => {
        this.router.navigate(["/home"])
      })
      .catch((error: Error) => {
        // TODO: Handle the error
        throw error;
      })
  }

}
