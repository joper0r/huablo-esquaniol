import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Response} from '../model/Response';
import {environment} from '../../environments/environment';


@Injectable()
export class SearchService {

  key: string = 'AIzaSyDdMpdZYGDo1aRz1qnU5xWuFTPLuzGWlpU';
  apiUrl: string = environment.elasticAPI;
  body: any = {
    from: 0,
    size: 1000,
    query: {
      bool: {
        filter: [],
        should: []
      }
    }
  };

  constructor(private http: HttpClient) {
  }

  // Sends a post request with the filter options to the backend and returns the response as an Observable
  getResults(query: string, options: any): Observable<Response> {
    this.body.query.bool.filter = [];
    this.body.query.bool.should = [];
    this.mapQuery(query);
    this.mapOptions(options);
    return this.http.post<Response>(this.apiUrl, this.body);
  }

  // Maps the search query into the query object
  mapQuery(query: string): void {
    if (query.replace(/\s/g, '').length > 0) {
      this.body.query.bool.filter.push({match_phrase_prefix: {title: query.toLowerCase()}});
    }
  }

  // Maps the search options into the query Object
  mapOptions(options: any): void {
    for (let option of options.category) {
      if (option.selected) {
        let tmpOptions = option.name.split('&');
        for (let category of tmpOptions) {
          this.body.query.bool.should.push({match_phrase: {categories: category.toLowerCase()}});
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
        this.body.query.bool.filter.push({range: {price: {gte: option.name}}});
      }
    }

    for (let option of options.author) {
      if (option.selected) {
        this.body.query.bool.should.push({match_phrase: {authors: option.name.toLowerCase()}});
      }
    }

    if (options.release.selected) {
      this.body.query.bool.filter.push({range: {publishedDate: {gte: options.release.name, lte: options.release.name + '-12-31' , format: 'yyyy-MM-dd||yyyy'}}});
    }
  }
}

