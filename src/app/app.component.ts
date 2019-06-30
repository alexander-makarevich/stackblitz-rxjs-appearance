import {Component} from '@angular/core';

import {RomanService} from './roman.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RomanService],
})
export class AppComponent  {
  constructor(public service: RomanService) {
    service.params$.subscribe(p => console.log(p));
  }

  private readonly pages = ['page 1', 'page 2', 'page 3'];
  private nextPage = 0;
  setPage() {
    this.service.setPage(this.pages[this.nextPage++]);
    if (this.nextPage >= this.pages.length) this.nextPage = 0;
  }

  private readonly languages = ['ru', 'en', 'it'];
  private nextLanguage = 0;
  setLanguage() {
    this.service.setLanguage(this.languages[this.nextLanguage++]);
    if (this.nextLanguage >= this.languages.length) this.nextLanguage = 0;
  }

  private readonly commonStyles = ['common 1', 'common 2', 'common 3'];
  private nextCommonStyles = 0;
  setCommonStyles() {
    this.service.setCommonStyles(this.commonStyles[this.nextCommonStyles++]);
    if (this.nextCommonStyles >= this.commonStyles.length) this.nextCommonStyles = 0;
  }
}
