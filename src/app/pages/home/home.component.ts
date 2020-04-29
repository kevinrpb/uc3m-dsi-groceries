import { Component } from "@angular/core";
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: []
})

export class HomeComponent {

  constructor(
    public auth: AuthService
  ) {}

  public dotsMenuItems: Array<{}> = [
    {
      title: 'Item1',
      subtitle: 'Subtitle1',
      function: () => {
        console.log('Item1')
      }
    },
    {
      title: 'Item2',
      subtitle: 'Subtitle2',
      function: () => {
        console.log('Item2')
      }
    }
  ]

}
