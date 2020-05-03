import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { List, ListProduct } from 'src/app/shared/models/list.model';
import { MenuItem } from 'src/app/shared/models/menu-item.model';
import { ListService } from 'src/app/core/lists/lists.service';
import { Location } from '@angular/common';
import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs';
import { filter } from "rxjs/operators";
import { MatSnackBar, MatDialog } from '@angular/material';
import { ShareListComponent } from 'src/app/shared/components/share-list/share-list.component';
import { FormControl } from '@angular/forms';
import { Product, Rating } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/core/lists/products.service';
import { Label } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { AuthService } from 'src/app/core/auth/auth.service';
import { age, UserGender } from 'src/app/shared/models/user.model'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(
    public auth:            AuthService,
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

  public price: string

  public calories: number
  public yourCalories: any

  public pieChartLabels: Array<Label> = ['Carbohidratos', 'Proteínas', 'Grasas']
  public pieChartData: Array<number> = []
  public pieChartOptions: ChartOptions = {
    legend: {
      position: "right",
      labels: {
        fontSize: 14,
        fontFamily: 'Roboto',
        fontStyle: 'bold'
      }
    }
  }

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

  public healthWarnings: Array<{}>
  private healthWarnings_: Array<{}> = [
    {
      warning: 'Tu lista tiene muchos productos con una elevada cantidad de azúcar 🍭',
      property: 'sugar',
      condition: (sugar: number) => sugar > 45
    },
    {
      warning: 'Deberías reducir los productos con un alto contenido en sal 🧂',
      property: 'salt',
      condition: (salt: number) => salt > 10
    },
    {
      warning: 'Cuidado con las grasas, no son muy recomendables 🥓',
      property: 'fat',
      condition: (fat: number) => fat > 50
    },
    {
      warning: 'Recuerda que las proteínas son importantes 🐮',
      property: 'proteins',
      condition: (proteins: number) => proteins < 45
    },
    {
      warning: 'Aunque son importantes, no te pases con los hidratos 🥔',
      property: 'carbos',
      condition: (carbos: number) => carbos > 125
    }
  ]

  public filteredOptions: Observable<Product[]>
  public searchbarControl: FormControl = new FormControl()

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.yourCalories = 
        (user.healthData) ?
        (10 * user.healthData.weight + 625 * user.healthData.height - 5 * age(user.healthData.birthdate) + (user.healthData.gender == UserGender.female ? -161 : 5)) :
        'No tenemos datos'
    })

    combineLatest(this.list$, this.productService.products$).subscribe(([list, products]) => {
      if (!list || !products) return
      this.listProducts = list.products

      const sum = (numbers: number[]) => numbers.reduce((prev, next) => prev + next, 0)
      const property = (value: string) => list.products.map(p => {
        const product = products.find(p_ => p_.pid === p.pid)
        return (product) ? product.healthData[value] : 0
      })
      const get = (value: string) => sum(property(value))

      this.pieChartData = [get('carbos'), get('proteins'), get('fat')]
      this.calories = get('calories')
      this.price = sum(list.products.map(p => p.price)).toFixed(2)

      this.healthWarnings = this.healthWarnings_.filter((w: any) =>
        w.condition(get(w.property))
      )
    })

    this.router.params.subscribe(params => {
      if (!params) return;
      this.listService.getList(params['lid']).subscribe(this.list$)
    })

    this.searchbarControl.valueChanges
      .pipe(filter((value: string) => (value) ? value.length > 1 : false))
      .subscribe((value: string) => this.filter(value))

    this.filteredOptions = this.productService.filteredProducts$.asObservable()

  }

  private filter(value: string) {
    this.productService.setFilter(value ? value : "")
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
