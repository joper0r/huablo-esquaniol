import {Component, OnInit} from '@angular/core';
import {SearchService} from '../../service/search.service';

@Component({
  selector: 'search-ui',
  templateUrl: './search-ui.component.html',
  styleUrls: ['./search-ui.component.scss']
})
export class SearchUiComponent implements OnInit {

  results: any[];

  constructor(public searchService: SearchService) {
  }

  ngOnInit() {
    this.searchService.getResults().subscribe(
      results => this.results = results
    );
    console.log(this.results);
  }

}
