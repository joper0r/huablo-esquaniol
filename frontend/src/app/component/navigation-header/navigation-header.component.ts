import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {SearchService} from '../../service/search.service';
import {Book} from '../../model/Book';
import {element} from 'protractor';

@Component({
  selector: 'navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss']
})
export class NavigationHeaderComponent implements OnInit {

  @Output() search = new EventEmitter<string>();
  email: string;
  password: string;
  searchString: string = '';

  suggestions: Book[] = [];

  @Input() filter: any;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
  }

  public doLogin(): void {
    console.log('Email: ' + this.email + ' Passwort:' + this.password);
  }

  public searchEvent(): void {
    document.getElementById('searchBar').blur();
    this.suggestions = [];
    this.search.emit(this.searchString);
  }

  public autoComplete(): void {
    if (this.searchString.replace(/\s/g, '').length > 0) {
      this.searchService.getResults(this.searchString, this.filter)
        .subscribe(response => this.suggestions = response.hits.hits.slice(0, 5));
    } else {
      this.hide();
    }
  }

  public searchEventDropdown(suggestion): void {
    this.suggestions = [];
    this.search.emit(suggestion);
  }

  public checkSuggestion(): boolean {
    return this.suggestions.length > 0;
  }

  public hide(): void {
    this.suggestions = [];
  }
}
