import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchUiComponent } from './component/search-ui/search-ui.component';
import { FavoritesComponent } from './component/favorites/favorites.component';
import { NavigationHeaderComponent } from './component/navigation-header/navigation-header.component';
import {SearchService} from './service/search.service';
import {HttpClientModule} from '@angular/common/http';
import {TypeaheadModule, PaginationModule } from 'ngx-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {FavoriteService} from './service/favorite.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchUiComponent,
    FavoritesComponent,
    NavigationHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TypeaheadModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule
  ],
  providers: [SearchService, FavoriteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
