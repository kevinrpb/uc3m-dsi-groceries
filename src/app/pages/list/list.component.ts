import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { List, ListProductAmountType } from 'src/app/shared/models/list.model';
import { MenuItem } from 'src/app/shared/models/menu-item.model';
import { ListService } from 'src/app/core/lists/lists.service';
import { Location } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ShareListComponent } from 'src/app/shared/components/share-list/share-list.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(
    private router:       ActivatedRoute,
    private location:     Location,
    private listService:  ListService,
    private snackBar:     MatSnackBar,
    private dialog:       MatDialog
  ) {}

  public list: BehaviorSubject<List>
  public name: string

  public dotsMenuItems: Array<MenuItem> = [
    {
      title: 'Vaciar',
      subtitle: 'Elimina todos los productos de la lista',
      function: () => {
        this.listService.emptyList(this.list.getValue().lid)
          .then(_ => {
            this.snackBar.open("La lista ha sido vaciada", "", { duration : 1500 })
          })
          .catch((error: Error) => {
            throw error
          })
      }
    },
    {
      title: 'Eliminar',
      subtitle: 'Elimina esta lista (para siempre 😦)',
      function: () => {
        this.listService.delete(this.list.getValue().lid)
          .then(_ => {
            this.location.back()
            this.snackBar.open("La lista ha sido eliminada", "", { duration : 1500 })
          })
          .catch((error: Error) => {
            throw error
          })
      }
    },
    {
      title: 'Compartir',
      subtitle: 'Gestiona los miembros de la lista',
      function: () => {
        this.dialog.open(
          ShareListComponent,
          {
            data: {
              lid: this.list.getValue().lid,
              members: [
              {
                displayName: 'Juan Pérez',
                email: 'juanito@gmail.com',
                image: 'assets/images/reduced_logo.svg'
              },
              {
                displayName: 'Sara Socas',
                email: 'sara456@hotmail.es',
                image: 'assets/images/reduced_logo.svg'
              }]
            },
            autoFocus: false,
            restoreFocus: false
          }
        )
      }
    }
  ]

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.list = this.listService.getList(params['lid'])
      this.name = this.list.getValue().name
    })
  }

  public updateName() {
    const updatedList = this.list.getValue()
    updatedList.name = this.name
    this.listService.update(updatedList.lid, updatedList)
  }

}
