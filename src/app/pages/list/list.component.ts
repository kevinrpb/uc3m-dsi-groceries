import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { List, ListProductAmountType } from 'src/app/shared/models/list.model';
import { MenuItem } from 'src/app/shared/models/menu-item.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private id: string

  public dotsMenuItems: Array<MenuItem> = [
    {
      title: 'Vaciar',
      subtitle: 'Elimina todos los productos de la lista',
      function: () => {
        console.log('Vaciar')
      }
    },
    {
      title: 'Eliminar',
      subtitle: 'Elimina esta lista (para siempre 😦)',
      function: () => {
        console.log('Eliminar')
      }
    },
    {
      title: 'Compartir',
      subtitle: 'Gestiona los miembros de la lista',
      function: () => {
        console.log('Compartir')
      }
    }
  ]


  list: List = {
    lid: '1',
    name: 'Mensual',
    owner: '',
    shared: true,
    participants: [],
    products: [
      {
        pid: '1',
        name: 'Galletas Cuétara',
        price: 14.58,
        amount: 1,
        amountType: ListProductAmountType.units
      },
      {
        pid: '2',
        name: 'Galletas Cuétara',
        price: 14.58,
        amount: 1,
        amountType: ListProductAmountType.units
      },
      {
        pid: '3',
        name: 'Galletas Cuétara',
        price: 14.58,
        amount: 1,
        amountType: ListProductAmountType.units
      }
    ]
  }

  constructor(
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.id = params['id']
    })
  }

}
