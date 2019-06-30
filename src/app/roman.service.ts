import {Injectable} from '@angular/core';

import {Subject, Observable, of, combineLatest} from 'rxjs'; 

type Params = any;

@Injectable()
export class RomanService {
  private languageSource = new Subject<string>();
  private language$ = this.languageSource.asObservable();

  private pageSource = new Subject<string>();
  private page$ = this.pageSource.asObservable();

  setLanguage(language: string) {
    this.languageSource.next(language);
  }

  setPage(page: string) {
    this.pageSource.next(page);
  }

  public params$ = combineLatest(this.language$, this.page$);

  getParams(language: string, page: string): Observable<Params> {
    return of({language: language, page: page});
  }
}