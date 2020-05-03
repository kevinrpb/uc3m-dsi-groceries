import { Component, Input } from '@angular/core';
import { List } from '../../models/list.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent {

  @Input() public list: List

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  public goList() {
    this.router.navigate([`/list/${this.list.lid}`])
  }

  public exportList(event: Event) {
    event.stopPropagation()
    var listTxt = `>> GROOKEPY ✌️ <<\nLista " ${this.list.name} ", con los productos:`
    this.list.products.forEach(p => listTxt += `\n> ${p.name} , ${p.amount}`)
    this.copyToClipboard(listTxt)
      .then(msg => {
        this.snackBar.open(msg, "", { duration : 1500})
      })
      .catch(msg => {
        this.snackBar.open(msg, "", { duration : 1500})
      })
  }

  private copyToClipboard(text: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!navigator.clipboard) {
        reject("El portapaeles no está disponible")
      }
      navigator.clipboard.writeText(text)
        .then(_ => {
          resolve("La lista ha sido copiada al portapapeles")
        })
        .catch((error: Error) => {
          reject(error.message)
        })
    })
    
  }

}
