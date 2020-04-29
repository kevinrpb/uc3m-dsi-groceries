import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: []
})
export class AppComponent implements OnInit {

  constructor(

  ) {}

  public bigScreen: boolean

  ngOnInit() {
    this.bigScreen = window.screen.height > 675
  }

}
