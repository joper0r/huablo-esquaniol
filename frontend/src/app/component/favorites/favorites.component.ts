import { Component, OnInit } from '@angular/core';
import {FavoriteService} from '../../service/favorite.service';
import {Book} from '../../model/Book';
@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  // only a part of all  for view
  results: Book[];

  // all results for pagination
  tmpResults: Book[];
  maxSize: number = 5;
  totalItems: number = 0;
  bigCurrentPage: number = 1;
  numPages: number = 0;
  favorites: string[];
  page: number = 1;

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit() {
    this.favoriteService.getFavorites('1').subscribe(
      favorites => {
        this.favorites = favorites.hits.hits[0]._source.bookID;
        if (this.favorites.length > 0) {
          this.favoriteService.getFavoriteBooks(this.favorites).subscribe( results => {
            this.results = results.hits.hits.slice(0, 10);
            this.tmpResults = results.hits.hits;
            this.totalItems = results.hits.total;
          });
        }
      }
    );
  }

  public getImageSrc(result): string {
    return result._source.imageLinks ? result._source.imageLinks.smallThumbnail : 'assets/noImage.jpeg';
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.results  = this.tmpResults.slice(this.page * 10 - 10, this.page * 10);
  }

  public checkFavorite(bookID: string): boolean {
    if (sessionStorage.getItem('loggedIn') === 'true') {
      return this.favorites.indexOf(bookID) > -1;
    } else {
      return false;
    }
  }

  public removeFavorite(bookId: string, bookIndex: number, book: Book) {
    let index = this.favorites.indexOf(bookId);

    this.favorites.splice(index, 1);
    this.tmpResults.splice(this.tmpResults.indexOf(book), 1);
    this.totalItems = this.tmpResults.length;
    
    if (this.totalItems > 0 && this.tmpResults.slice(this.page * 10 - 10, this.page * 10).length === 0) {
      this.page -= 1;
      this.results  = this.tmpResults.slice(this.page * 10 - 10, this.page * 10);
    } else if (this.totalItems > 0) {
      this.results  = this.tmpResults.slice(this.page * 10 - 10, this.page * 10);
    } else {
      this.results = [];
    }

    this.favoriteService.updateFavorites(sessionStorage.getItem('userID'), this.favorites);
  }
}
