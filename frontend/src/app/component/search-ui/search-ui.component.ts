import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../../service/search.service';
import {Book} from '../../model/Book';
import {NavigationHeaderComponent} from '../navigation-header/navigation-header.component';
import {Filter} from '../../model/Filter';

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

  searchString: string = ' ';

  maxSize: number = 5;
  totalItems: number = 0;
  bigCurrentPage: number = 1;
  numPages: number = 0;

  constructor(public searchService: SearchService) {
  }

  // Initial search to fill the page
  ngOnInit() {
    this.searchService.getResults('', this.filter).subscribe(
      results => {
        this.results = results.hits.hits.slice(0, 10);
        this.tmpResults = results.hits.hits;
        this.totalItems = results.hits.total;
      }
    );
  }

  // updates the filter and calls the search function
  public selection(event, index, type): void {
    this.filter[type][index].selected = event.target.checked;
    this.updateResults(this.searchString);
  }

  // calls the search service to update the website results
  public updateResults(searchString): void {
    this.searchString = searchString;

    this.searchService.getResults(searchString, this.filter).subscribe(
      results => {
        this.results = results.hits.hits.slice(0, 10);
        this.tmpResults = results.hits.hits;
        this.totalItems = results.hits.total;
      }
    );
  }

  // check if the response contains an image source else returns an fallback
  public getImageSrc(result): string {
    return result._source.imageLinks ? result._source.imageLinks.smallThumbnail : 'assets/noImage.jpeg';
  }

  // changes the results on a page change
  pageChanged(event: any): void {
    this.results  = this.tmpResults.slice(event.page * 10 - 10, event.page * 10);
  }
}
