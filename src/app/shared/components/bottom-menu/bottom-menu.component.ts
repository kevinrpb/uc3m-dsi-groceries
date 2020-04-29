import { Component, Input, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss']
})
export class BottomMenuComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public items: {},
    private bottomSheetRef: MatBottomSheetRef<BottomMenuComponent>
  ) {}

  public function(item: any) {
    this.bottomSheetRef.dismiss()
    item.function()
  }

}