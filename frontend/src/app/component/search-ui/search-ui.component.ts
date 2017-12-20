import {Component, OnInit} from '@angular/core';
import {SearchService} from '../../service/search.service';
import {Book} from '../../model/Book';

@Component({
  selector: 'search-ui',
  templateUrl: './search-ui.component.html',
  styleUrls: ['./search-ui.component.scss']
})
export class SearchUiComponent implements OnInit {

  results: Book[];
  filter = {
    category: [{name: 'Horror', type: 'category', selected: false},
      {name: 'Adventure Stories & Action', type: 'category', selected: false},
      {name: 'Science Fiction & Fantasy Novels', type: 'cathgory', selected: false},
      {name: 'Mystery & Thrillers', type: 'category', selected: false},
      {name: 'Science & Technology', type: 'category', selected: false},
      {name: 'Computers & Internet', type: 'category', selected: false},
      {name: 'Politics & History', type: 'category', selected: false},
      {name: 'Romance', type: 'category', selected: false},
      {name: 'Sports', type: 'category', selected: false}],
    delivery: [{name: 'Super Fast', type: 'delivery', selected: false},
      {name: 'Fast', type: 'delivery', selected: false},
      {name: 'Normal', type: 'delivery', selected: false}],
    format: [{name: 'Audiobook', type: 'format', selected: false},
      {name: 'Paperback', type: 'format', selected: false},
      {name: 'Hardcover', type: 'format', selected: false}],
    price: [{name: '10', type: 'price', selected: false},
      {name: '10', type: 'price', selected: false},
      {name: '20', type: 'price', selected: false},
      {name: '30', type: 'price', selected: false},
      {name: '40', type: 'price', selected: false},
      {name: '50', type: 'price', selected: false}]
  };

  searchString: string = ' ';

  constructor(public searchService: SearchService) {
  }

  ngOnInit() {
    this.searchService.getResults('Harry Potter', this.filter).subscribe(
      results => this.results = results.items
    );
  }

  public selection(event, index, type): void {
    this.filter[type][index].selected = event.target.checked;
    this.updateResults(this.searchString);
  }

  public updateResults(searchString): void {
    this.searchString = searchString;

    this.searchService.getResults(searchString, this.filter).subscribe(
      results => this.results = results.items
    );
  }

  public getImageSrc(result): string {
    return result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.smallThumbnail : 'assets/noImage.jpeg';
  }
}

