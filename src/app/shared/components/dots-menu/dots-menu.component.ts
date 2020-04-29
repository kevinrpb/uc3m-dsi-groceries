import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomMenuComponent } from '../bottom-menu/bottom-menu.component';

@Component({
  selector: 'dots-menu',
  templateUrl: './dots-menu.component.html',
  styleUrls: ['./dots-menu.component.scss']
})
export class DotsMenuComponent {

  @Input() private items: Array<{}>

  constructor(
    private bottomSheet: MatBottomSheet
  ) {}
  
  openBottomSheet() {
    this.bottomSheet.open(
      BottomMenuComponent,
      {
        data: this.items, 
        hasBackdrop: true, 
        closeOnNavigation: true
      }
    )
  }

}
