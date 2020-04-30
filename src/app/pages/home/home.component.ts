import { Component } from "@angular/core";
import { AuthService } from '../../core/auth/auth.service';
import { MatSnackBar, MatDialog, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { MenuItem } from 'src/app/shared/models/menu-item.model';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { List } from 'src/app/shared/models/list.model';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})

export class HomeComponent {

  constructor(
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  public dotsMenuItems: Array<MenuItem> = [
    {
      title: 'Perfil',
      subtitle: 'Revisa tu perfil y modifícalo',
      function: () => {
        this.snackBar.open("Esta vista no ha sido implementada", "", {duration : 1500})
      }
    },
    {
      title: 'F.A.Q.',
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

  public lists: Array<List> = [
    {
      lid: 'a',
      name: 'Mensual',
      shared: true,
      products: []
    },
    { 
      lid: 'b',
      name: 'Semanal',
      shared: false,
      products: []
    },
    {
      lid: 'c',
      name: 'Fiesta',
      shared: true,
      products: []
    }
  ]

  public addList() {
    const dialogRef = this.dialog.open(
      DialogComponent,
      {
        data: this.dotsMenuItems,
        autoFocus: false,
        position: {bottom: '50px'}
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'empty') {

      }
      else if (result === 'copy') {
        this.snackBar.open("Esta opción no ha sido implementada", "", {duration : 1500})
      }
    })
  }

}
