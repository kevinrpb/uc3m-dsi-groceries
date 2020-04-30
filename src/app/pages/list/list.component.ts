import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { List } from 'src/app/shared/models/list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private id: string

  list: List = {
    lid: '1',
    name: 'Mensual',
    shared: true,
    products: [
      {
        pid: '1',
        name: 'Galletas Cuétara',
        price: 14.58
      },
      {
        pid: '2',
        name: 'Galletas Cuétara',
        price: 14.58
      },
      {
        pid: '3',
        name: 'Galletas Cuétara',
        price: 14.58
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
