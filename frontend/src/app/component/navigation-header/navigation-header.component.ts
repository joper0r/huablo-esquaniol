import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {SearchService} from '../../service/search.service';
import {Book} from '../../model/Book';

@Component({
  selector: 'navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss']
})
export class NavigationHeaderComponent implements OnInit {

  @Output() search = new EventEmitter<string>();
  email: string;
  password: string;
  searchString: string;

  query: string;
  autoCompleteRef: Observable<any>;

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

  constructor(private searchService: SearchService) {
    this.autoCompleteRef = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.query);
    }).mergeMap((token: string) => this.autoComplete());
  }

  ngOnInit() {
  }

  public doLogin(): void {
    console.log('Email: ' + this.email + ' Passwort:' + this.password);
  }

  public changedInput(): void {
    console.log('Search for: ' + this.searchString);
  }

  public searchEvent(e): void {
    this.search.emit(e.value);
  }

  public autoComplete(): Observable<Book[]> {
    return this.searchService.getResults(this.query, this.filter).map(response => response.items);
  }
}
