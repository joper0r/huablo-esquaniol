import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SearchUiComponent } from './component/search-ui/search-ui.component';
import { FavoritesComponent } from './component/favorites/favorites.component';
import { NavigationHeaderComponent } from './component/navigation-header/navigation-header.component';
import {SearchService} from './service/search.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SearchUiComponent,
    FavoritesComponent,
    NavigationHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
