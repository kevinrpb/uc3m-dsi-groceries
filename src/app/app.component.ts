import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: []
})
export class AppComponent implements OnInit {

  constructor(

  ) { }

  private screenHeight: Number

  public bigScreen: boolean
  public verySmallScreen: boolean

  ngOnInit() {
    this.screenHeight = window.innerHeight

    if (/Android/.test(navigator.appVersion)) {
      window.addEventListener("resize", (event) => {
        if (window.innerHeight == this.screenHeight) {
          document.body.classList.remove('keyboard')
          return
        }
        if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
          document.body.classList.add('keyboard')
        }
      })
    }

    this.verySmallScreen = this.screenHeight < 540
    this.bigScreen = this.screenHeight > 675
  }

}
