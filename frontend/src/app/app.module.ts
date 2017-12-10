import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SearchUiComponent } from './component/search-ui/search-ui.component';
import { FavoritesComponent } from './component/favorites/favorites.component';
import { NavigationHeaderComponent } from './component/navigation-header/navigation-header.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchUiComponent,
    FavoritesComponent,
    NavigationHeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
