import {Injectable} from '@angular/core';

import {Subject, ReplaySubject, Observable, of, combineLatest} from 'rxjs'; 
import {switchMap, map, first} from 'rxjs/operators';

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

  private commonStylesSource = new ReplaySubject<CommonStyles>();
  private commonStyles$ = this.commonStylesSource.asObservable();
  setCommonStyles(style: string) {
    this.commonStylesSource.next({common: style});
  }

  //TODO: use delayWhen instead of first().
  public params$ = combineLatest(this.language$, this.page$).pipe(
    switchMap(([language, page]) => combineLatest(this.commonStyles$.pipe(first()), this.getParams(language, page))),
    map(([commonStyles, params]) => ({...params, ...commonStyles}))
  );

  getParams(language: string, page: string, ): Observable<Params> {
    return of({language: language, page: page});
  }
}