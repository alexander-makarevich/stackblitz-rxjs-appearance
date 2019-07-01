import {Injectable} from '@angular/core';

import {Subject, ReplaySubject, BehaviorSubject, Observable, of, combineLatest} from 'rxjs'; 
import {switchMap, map, first, delayWhen, last, repeatWhen, take, debounce, withLatestFrom} from 'rxjs/operators';

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

  private commonStylesSource = new BehaviorSubject<CommonStyles>(null);
  private commonStyles$ = this.commonStylesSource.asObservable();
  setCommonStyles(style: string) {
    this.commonStylesSource.next({common: style});
  }

  //TODO: use delayWhen instead of first().
  public params$ = combineLatest(this.language$, this.page$).pipe(
    switchMap(([language, page]) => combineLatest(
      of(this.commonStylesSource.getValue()),
      this.getParams(language, page))
    ),
    map(([commonStyles, params]) => ({...params, ...commonStyles}))
  );

  delayedStyles$ = this.language$.pipe(
    withLatestFrom(this.commonStyles$)
  );
  // delayedStyles$ = this.commonStyles$.pipe(
  //   // take(1),
  //   debounce(() => this.language$)
  // );

  getParams(language: string, page: string, ): Observable<Params> {
    return of({language: language, page: page});
  }
}