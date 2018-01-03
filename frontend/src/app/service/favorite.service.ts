import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Response} from '../model/Response';
import {environment} from '../../environments/environment';


@Injectable()
export class FavoriteService {

  userID: string = '12378';
  apiUrl: string = environment.apiEndpoint;
  body: any = {
    bookID: []
  };

  bodySearch: any = {
    from: 0,
    size: 1000,
    query: {
      bool: {
        should: []
      }
    }
  };

  constructor(private http: HttpClient) {
  }

  getFavorites(userID: string): Observable<any> {
    return this.http.get(this.apiUrl + 'user/_search?q=_id:' + this.userID);
  }

  getFavoriteBooks(favorites: string[]): Observable<Response> {
    this.bodySearch.query.bool.should = [];
    this.mapFavorites(favorites);
    return this.http.post<Response>(this.apiUrl + 'books/_search', this.bodySearch);
  }

  updateFavorites(userID: string, favorites: string[]): void {
    this.body.bookID = favorites;
    this.http.put<any>(this.apiUrl + '/user/favorites/' + this.userID, this.body);
  }

  mapFavorites(favorites: any[]): void {
    for (let favorite of favorites) {
      this.bodySearch.query.bool.should.push({match_phrase: {id: favorite.toLowerCase()}});
    }
  }
}
