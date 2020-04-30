import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { List, ListProductAmountType } from 'src/app/shared/models/list.model';
import { MenuItem } from 'src/app/shared/models/menu-item.model';
import { ListService } from 'src/app/core/lists/lists.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public list: List

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

  constructor(
    private router: ActivatedRoute,
    private listService: ListService
  ) {}

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.list = this.listService.getList(params['lid'])
    })
  }

}
