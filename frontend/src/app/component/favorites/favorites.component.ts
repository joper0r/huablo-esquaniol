import { Component, OnInit } from '@angular/core';
import {FavoriteService} from '../../service/favorite.service';
import {Book} from '../../model/Book';
@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  results: Book[];
  tmpResults: Book[];
  maxSize: number = 5;
  totalItems: number = 0;
  bigCurrentPage: number = 1;
  numPages: number = 0;
  favorites: string[];

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
    this.results  = this.tmpResults.slice(event.page * 10 - 10, event.page * 10);
  }

}
