import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss']
})
export class NavigationHeaderComponent implements OnInit {

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

  public search(): void {
    console.log('Search for: ' + this.searchString);
  }
}
