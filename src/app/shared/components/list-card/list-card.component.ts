import { Component, Input } from '@angular/core';
import { List, ListProductAmountType } from '../../models/list.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard'

@Component({
  selector: 'list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent {

  @Input() public list: List

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private clipboard: ClipboardService
  ) { }

  public goList() {
    this.router.navigate([`/list/${this.list.lid}`])
  }

  public exportList(event: Event) {
    event.stopPropagation()
    let listTxt = `>> GROOKEPY ✌️ <<\nLista " ${this.list.name} ", con los productos: ${this.list.products}`
    this.list.products.forEach(p => listTxt += `\n> ${p.name} , ${p.amount}${(p.amountType == ListProductAmountType.units) ? "unidades" : "gr."}`)
    this.clipboard.copyFromContent(listTxt)
    this.snackBar.open("La lista ha sido copiada al portapapeles", "", { duration : 1500})
  }

}
