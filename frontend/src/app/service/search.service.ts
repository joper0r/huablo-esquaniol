import {Injectable} from '@angular/core';
import {RESULTS} from '../mock/mock-response';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';
import {Book} from '../model/Book';
import {Response} from '../model/Response';


@Injectable()
export class SearchService {

  key: string = 'AIzaSyDdMpdZYGDo1aRz1qnU5xWuFTPLuzGWlpU';
  apiUrl: string = 'https://www.googleapis.com/books/v1/volumes?q=';

  constructor(private http: HttpClient) {
  }

  getResults(query: string, options: any[]): Observable<Response> {
    const searchQuery = this.mapQuery(query) + this.mapOptions(options);
    return this.http.get<Response>(this.apiUrl + searchQuery + '&key=' + this.key);
  }

  mapQuery(query: string): string {
    let result: string = query.toLowerCase();
    return result.replace(' ', '+');
  }

  mapOptions(options: any[]): string {
    let isFirst: boolean = true;
    let result: string = '';

    for (let option of options) {
      if (option.selected) {
        if (!isFirst) {
          result += '+' + option.name.toLowerCase();
        } else {
          result += '+subject:' + option.name.toLowerCase();
          isFirst = false;
        }
      }
    }
    return result;
  }
}
