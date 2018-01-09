import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../../service/search.service';
import {Book} from '../../model/Book';
import {NavigationHeaderComponent} from '../navigation-header/navigation-header.component';
import {Filter} from '../../model/Filter';
import {FavoriteService} from '../../service/favorite.service';

@Component({
  selector: 'search-ui',
  templateUrl: './search-ui.component.html',
  styleUrls: ['./search-ui.component.scss']
})
export class SearchUiComponent implements OnInit {

  @ViewChild('navHeader') navHeader;

  results: Book[];
  tmpResults: Book[];
  filter = Filter;
  searchFilter = {};

  searchString: string = '';

  maxSize: number = 5;
  totalItems: number = 0;
  bigCurrentPage: number = 1;
  numPages: number = 0;
  favorites: string[] = [];
  loggedIn: boolean = false;

  constructor(private searchService: SearchService, private favoriteService: FavoriteService ) {
  }

  // Initial search to fill the page
  ngOnInit() {
    if (sessionStorage.getItem('loggedIn') === 'true') {
      this.updateResults(this.searchString);
      this.getFavorites();
    }
  }

  // updates the filter and calls the search function
  public selection(event, index, type): void {
    let checked: boolean = event.target.checked;
    let indexFilter: number = this.filter[type].indexOf(this.searchFilter[type]);

    if (checked && indexFilter > -1) {
      this.filter[type][indexFilter].selected = false;
      this.searchFilter[type] = this.filter[type][index];
    } else if (checked) {
      this.searchFilter[type] = this.filter[type][index];
    } else {
      delete this.searchFilter[type];
    }

    this.updateResults(this.searchString);
  }

  public checkAuthor(): void {
    if (this.filter.author.length === 1 && this.searchFilter['author'] !== undefined) {
      this.filter.author[0].selected = true;
    }
  }

  // calls the search service to update the website results
  public updateResults(searchString): void {
    this.searchString = searchString;

    this.searchService.getResults(searchString, this.searchFilter).subscribe(
      results => {
        this.results = results.hits.hits.slice(0, 10);
        this.tmpResults = results.hits.hits;
        this.totalItems = results.hits.total;
        this.filter.author = this.getAuthors(this.tmpResults);
        this.checkAuthor();
      }
    );
  }

  public getAuthors(searchResults): any[] {
    let tmpAuthors = [];

    for (let book of searchResults) {
      if (book._source.authors[0] !== 'u') {
        tmpAuthors.push({name: book._source.authors[0], type: 'author', selected: false});
      }
    }

    return tmpAuthors;
  }

  // public getPrices(searchResults): any[] {
  //   let tmpPrices = [];
  //   let prices = [0, 10, 20, 30, 40, 50, 60, 70, 80];
  //
  //   for (let price of prices) {
  //     let filter = searchResults.filter(function (el) {
  //       return el._source.price > price && el._source.price < (price + 10);
  //     });
  //
  //     if (filter.length > 0) {
  //       tmpPrices.push({name: price, type: 'price', selected: false});
  //     }
  //   }
  //
  //   return tmpPrices;
  // }

  // check if the response contains an image source else returns an fallback
  public getImageSrc(result): string {
    return result._source.imageLinks ? result._source.imageLinks.smallThumbnail : 'assets/noImage.jpeg';
  }

  // changes the results on a page change
  pageChanged(event: any): void {
    this.results  = this.tmpResults.slice(event.page * 10 - 10, event.page * 10);
  }

  updateReleaseFilter() {
    this.filter.release.selected = this.filter.release.name.replace(/\s/g, '').length === 4;

    if (this.filter.release.selected ) {
      this.searchFilter['release'] = this.filter.release;
    } else {
      delete this.searchFilter['release'];
    }
  }

  public checkFavorite(bookID: string): boolean {
    if (sessionStorage.getItem('loggedIn') === 'true') {
      return this.favorites.indexOf(bookID) > -1;
    } else {
      return false;
    }
  }

  public getFavorites(): void {
    this.loggedIn = true;
    this.favoriteService.getFavorites(sessionStorage.getItem('userID')).subscribe(
      favorites => {
        if (favorites.hits.hits[0] !== undefined) {
          this.favorites = favorites.hits.hits[0]._source.bookID;
        }
      }
    );
  }

  public toggleFavorite(bookId: string) {
    let index = this.favorites.indexOf(bookId);

    if (index > -1) {
      console.log(this.favorites.splice(index, 1));
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(bookId);
    }

    this.favoriteService.updateFavorites(sessionStorage.getItem('userID'), this.favorites);
  }
}
