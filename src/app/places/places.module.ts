import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacesRoutingModule } from './places-routing.module';
import { PlacesComponent } from './places.component';
import { AddplaceComponent } from '../addplace/addplace.component';
import { CounterComponent } from '../counter/counter.component';
import { PlaceListComponent } from '../place-list/place-list.component';
import { TravelComponent } from '../travel/travel.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { EditplaceComponent } from '../editplace/editplace.component';
import { PlacedetailComponent } from '../placedetail/placedetail.component';
import { InfiniteScrollDirective } from '../infinite-scroll.directive';
import { TravelDataService } from '../travel-data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FavouriteComponent } from '../favourite/favourite.component';
@NgModule({
  declarations: [
    PlacesComponent,
    TravelComponent,
    CounterComponent,
    PlaceListComponent,
    AddplaceComponent,
    EditplaceComponent,
    PlacedetailComponent,
    InfiniteScrollDirective,
    ConfirmDialogComponent,
    FavouriteComponent,
  ],
  imports: [
    CommonModule,
    PlacesRoutingModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  providers: [TravelDataService, MatDialog],
})
export class PlacesModule {}
