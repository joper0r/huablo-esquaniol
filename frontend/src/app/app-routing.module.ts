import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchUiComponent} from './component/search-ui/search-ui.component';
import {FavoritesComponent} from './component/favorites/favorites.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {path: 'main', component: SearchUiComponent},
  {path: 'favorites', component: FavoritesComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule {
}
