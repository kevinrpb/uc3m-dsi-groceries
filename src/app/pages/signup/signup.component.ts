import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(

  ) { }

  private signupForm = new FormGroup({
    email:        new FormControl('', [Validators.required, Validators.email]),
    password:     new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm_pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name:         new FormControl('', [Validators.required, Validators.pattern('([a-zA-ZáéíóúÁÉÍÓÚ]+[ ]?)+')]),
    last_name:    new FormControl('', [Validators.required, Validators.pattern('([a-zA-ZáéíóúÁÉÍÓÚ-]+[ ]?)+')]),
    birthdate:    new FormControl('', [Validators.required]),
    weight:       new FormControl('', [Validators.required, Validators.pattern('[1-9][0-9]*')]),
    height:       new FormControl('', [Validators.required, Validators.pattern('[0-9](.)[0-9]{2}')]),
  })

  private get email()         { return this.signupForm.get('email')         }
  private get password()      { return this.signupForm.get('password')      }
  private get confirm_pass()  { return this.signupForm.get('confirm_pass')  }
  private get name()          { return this.signupForm.get('name')          }
  private get last_name()     { return this.signupForm.get('last_name')     }
  private get birthdate()     { return this.signupForm.get('birthdate')     }
  private get weight()        { return this.signupForm.get('weight')        }
  private get height()        { return this.signupForm.get('height')        }

}
