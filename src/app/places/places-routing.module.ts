import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesComponent } from './places.component';
import { AddplaceComponent } from '../addplace/addplace.component';
import { EditplaceComponent } from '../editplace/editplace.component';
import { PlaceListComponent } from '../place-list/place-list.component';
import { PlacedetailComponent } from '../placedetail/placedetail.component';
import { FavouriteComponent } from '../favourite/favourite.component';

const routes: Routes = [
  { path: '', component: PlaceListComponent, pathMatch: 'full' },
  { path: 'add', component: AddplaceComponent },
  { path: 'favourite', component: FavouriteComponent },
  { path: 'edit/:id', component: EditplaceComponent },
  { path: ':id', component: PlacedetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesRoutingModule {}
