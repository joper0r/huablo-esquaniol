import {Injectable} from '@angular/core';
import {RESULTS} from '../mock/mock-response';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Book} from '../model/Book';
import {Response} from '../model/Response';
import {environment} from '../../environments/environment';
import {RequestOptions} from '@angular/http';


@Injectable()
export class SearchService {

  key: string = 'AIzaSyDdMpdZYGDo1aRz1qnU5xWuFTPLuzGWlpU';
  apiUrl: string = environment.elasticAPI;
  body: any = {
    from: 0,
    size: 1000,
    query: {
      bool: {
        filter: []
      }
    }
  };

  constructor(private http: HttpClient) {
  }

  getResults(query: string, options: any): Observable<Response> {
    this.body.query.bool.filter = [];
    this.mapQuery(query);
    this.mapOptions(options);
    return this.http.post<Response>(this.apiUrl, this.body);
  }

  mapQuery(query: string): void {
    if (query.replace(/\s/g, '').length > 0) {
      this.body.query.bool.filter.push({match_phrase_prefix: {title: query.toLowerCase()}});
    }
  }

  mapOptions(options: any): void {
    for (let option of options.category) {
      if (option.selected) {
        option.name = option.name.replace(/\s/g, '');
        let tmpOptions = option.name.split('&');
        for (let category of tmpOptions) {
          this.body.query.bool.filter.push({match_phrase: {categories: category.toLowerCase()}});
        }
      }
    }

    for (let option of options.delivery) {
      if (option.selected) {
        this.body.query.bool.filter.push({match_phrase: {deliveryOption: option.name.toLowerCase()}});
      }
    }

    for (let option of options.format) {
      if (option.selected) {
        this.body.query.bool.filter.push({match_phrase: {printType: option.name.toLowerCase()}});
      }
    }

    for (let option of options.price) {
      if (option.selected) {
        this.body.query.bool.filter.push({range: {price: {gte: option.name }}});
      }
    }
  }
}
