import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { List, ListProduct } from 'src/app/shared/models/list.model';
import { MenuItem } from 'src/app/shared/models/menu-item.model';
import { ListService } from 'src/app/core/lists/lists.service';
import { Location } from '@angular/common';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ShareListComponent } from 'src/app/shared/components/share-list/share-list.component';
import { FormControl } from '@angular/forms';
import { Product, Rating } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/core/lists/products.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(
    private router:         ActivatedRoute,
    private location:       Location,
    private listService:    ListService,
    private productService: ProductsService,
    private snackBar:       MatSnackBar,
    private dialog:         MatDialog
  ) { }

  public Rating = Rating

  public list$: BehaviorSubject<List> = new BehaviorSubject(null)
  public listProducts: Array<ListProduct> = []

  public dotsMenuItems: Array<MenuItem> = [
    {
      title: 'Miembros',
      subtitle: 'Revisa quién tiene acceso a la lista',
      function: () => {
        this.dialog.open(
          ShareListComponent,
          {
            data: this.list$,
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
        this.listService.emptyList(this.list$.getValue().lid)
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
        this.listService.delete(this.list$.getValue().lid)
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

  public filteredOptions: Observable<Product[]>
  public searchbarControl: FormControl = new FormControl()

  ngOnInit() {
    this.list$.subscribe(list => {
      if (!list) return
      this.listProducts = list.products
    })

    this.router.params.subscribe(params => {
      if (!params) return;
      this.listService.getList(params['lid']).subscribe(this.list$)
    })

    this.searchbarControl.valueChanges.subscribe(value => this.filter(value))
    this.filteredOptions = this.productService.filteredProducts$.asObservable()
  }

  private filter(value: string) {
    this.productService.setFilter(value ? value.split(' ') : [])
  }

  public updateList() {
    const list = this.list$.getValue()
    this.listService.update(list.lid, list)
  }

  public addProduct(product: Product) {
    const { lid } = this.list$.getValue()
    const { pid, name, price, healthData } = product;
    const { rating } = healthData;

    this.listService.addProduct(lid, { pid, name, price, rating, amount: healthData.amountBase, bought: false })
      .then(_ => {
        this.snackBar.open('Producto añadido', "", { duration: 1000 })
      })
      .catch(error => {
        throw error
      })
  }

  public deleteProduct(event: any, pid: string) {
    document.getElementById(pid).style.transform = `translate3d(${event.velocity > 0 ? '' : '-'}100%, 0, 0)`
    setTimeout(_ => {
      const { lid, products } = this.list$.getValue()
      const product = products.find(p => p.pid === pid)

      this.listService.removeProduct(lid, product)
        .then(_ => {
          this.snackBar.open("Producto eliminado", "", { duration : 1000 })
        })
        .catch(error => {
          throw error
        })
    }, 250)
  }

  public checkDisabled() {
    if (this.listProducts.length === 0) {
      this.snackBar.open("Debes añadir un producto antes 😒", "", { duration : 1000})
    }
  }

}
