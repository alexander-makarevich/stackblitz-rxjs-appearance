import {Injectable} from '@angular/core';

import {Subject, Observable, of, combineLatest} from 'rxjs'; 
import {switchMap, map} from 'rxjs/operators';

type Params = any;
type CommonStyles = any;

@Injectable()
export class RomanService {
  private languageSource = new Subject<string>();
  private language$ = this.languageSource.asObservable();
  setLanguage(language: string) {
    this.languageSource.next(language);
  }

  private pageSource = new Subject<string>();
  private page$ = this.pageSource.asObservable();
  setPage(page: string) {
    this.pageSource.next(page);
  }

  // private commonStylesSource = new Subject();
  // private commonStyles$ = this.commonStylesSource.asObservable();
  getCommonStyles(): Observable<CommonStyles> {
    return of({common: 'common'});
  }

  public params$ = combineLatest(this.language$, this.page$).pipe(
    switchMap(([language, page]) => combineLatest(this.getCommonStyles(), this.getParams(language, page))),
    map(([commonStyles, params]) => ({...params, ...commonStyles}))
  );

  getParams(language: string, page: string, ): Observable<Params> {
    return of({language: language, page: page});
  }
}