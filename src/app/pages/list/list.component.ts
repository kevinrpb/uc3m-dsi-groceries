import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { List } from 'src/app/shared/models/list.model';
import { MenuItem } from 'src/app/shared/models/menu-item.model';
import { ListService } from 'src/app/core/lists/lists.service';
import { Location } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ShareListComponent } from 'src/app/shared/components/share-list/share-list.component';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Product, Rating } from 'src/app/shared/models/product.model';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

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

  public resetPosition: {} = {x : 0, y : 0}

  public list: BehaviorSubject<List>
  public name: string

  public dotsMenuItems: Array<MenuItem> = [
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
    },
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
    }
  ]

  public filteredOptions: Observable<Array<Product>>
  public searchbarControl: FormControl = new FormControl()
  public options: Array<Product> = [
    {
      pid: '1',
      category: 'a',
      healthData: {
        rating: Rating.bad,
        amountBase: 100,
        carbos: 45,
        fat: 15,
        proteins: 5
      },
      name: 'Galletas Fontaneda',
      price: 14.58,
      tags: []
    },
    {
      pid: '2',
      category: 'a',
      healthData: {
        rating: Rating.dontDoIt,
        amountBase: 100,
        carbos: 45,
        fat: 15,
        proteins: 5
      },
      name: 'Galletas Oreo',
      price: 14.58,
      tags: []
    }
  ]

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.list = this.listService.getList(params['lid'])
      this.name = this.list.getValue().name
    })
    this.filteredOptions = this.searchbarControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    )
  }

  private filter(value: string): Array<Product> {
    if (!value) return []
    const filterValue = value.toLowerCase()
    return (value) ? this.options.filter(option => option.name.toLowerCase().includes(filterValue)) : []
  }

  public updateName() {
    const updatedList = this.list.getValue()
    updatedList.name = this.name
    this.listService.update(updatedList.lid, updatedList)
  }

  public addProduct(product: Product) {
    console.log(product.name)
  }

  public delete(event: CdkDragEnd, pid: string) {
    if (Math.abs(event.distance.x) > 125)
      this.options = this.options.filter(option => option.pid !== pid)
    else {
      this.resetPosition = {x : 0, y : 0}
    }
  }

}
