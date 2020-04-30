import { Component, Input } from '@angular/core';
import { List } from '../../models/list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent {

  @Input() public list: List

  constructor(
    private router: Router
  ) { }

  public goList() {
    this.router.navigate([`/list/${this.list.lid}`])
  }

  public exportList(event) {
    event.stopPropagation()
    console.log('Export: ' + this.list.name)
  }

}
