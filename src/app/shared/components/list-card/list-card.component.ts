import { Component, Input } from '@angular/core';
import { List } from '../../models/list.model';

@Component({
  selector: 'list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent {

  @Input() public list: List

  constructor(

  ) { }

  public goList() {
    console.log('Go: ' + this.list.name)
  }

  public exportList(event) {
    event.stopPropagation()
    console.log('Export: ' + this.list.name)
  }

}
