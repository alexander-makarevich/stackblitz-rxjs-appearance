import {Component} from '@angular/core';

import {RomanService} from './roman.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RomanService],
})
export class AppComponent  {
  name = 'Angular';
}
