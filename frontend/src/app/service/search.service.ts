import {Injectable} from '@angular/core';
import {RESULTS} from '../mock/mock-response';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SearchService {

  constructor() {
  }

  getResults(): Observable<any[]> {
    return of(RESULTS);
  }
}
