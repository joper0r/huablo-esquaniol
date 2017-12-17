import {Component, OnInit, Output, EventEmitter} from '@angular/core';

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

  constructor() {
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
    e.preventDefault();
    this.search.emit(this.searchString);
  }
}
