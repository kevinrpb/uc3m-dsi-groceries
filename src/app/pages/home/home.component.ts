import { Component } from "@angular/core";
import { AuthService } from '../../core/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
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

  public lists: any = [
    {
      name: 'list1',
      shared: false
    },
    { 
      name: 'list2',
      shared: true
    }
  ]

}
