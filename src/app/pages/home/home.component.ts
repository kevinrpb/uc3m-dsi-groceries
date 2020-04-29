import { Component } from "@angular/core";
import { AuthService } from '../../core/auth/auth.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})

export class HomeComponent {

  constructor(
    public auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  public dotsMenuItems: Array<{}> = [
    {
      title: 'Perfil',
      subtitle: 'Revisa tu perfil y modifícalo',
      function: () => {
        this.snackBar.open("Esta vista no ha sido implementada", "", {duration : 1500})
      }
    },
    {
      title: 'F.A.Q',
      subtitle: '¿Necesitas ayuda?',
      function: () => {
        this.snackBar.open("Esta vista no ha sido implementada", "", {duration : 1500})
      }
    },
    {
      title: 'Cerrar sesión',
      subtitle: '¡Hasta la próxima!',
      function: () => {
        this.auth.signOut()
      }
    }
  ]

  public lists: any = [
    {
      name: 'Mensual',
      shared: true
    },
    { 
      name: 'Semanal',
      shared: false
    },
    {
      name: 'Fiesta',
      shared: true
    }
  ]

}
