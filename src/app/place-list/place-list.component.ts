import { Component } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { place } from '../app.component';
import { TravelDataService } from '../travel-data.service';
import { PageEvent } from '@angular/material/paginator';
// import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss'],
  // standalone: true,
  // imports: [MatPaginatorModule],
})
export class PlaceListComponent {
  places: Array<place> = [];
  getPlaceList: Subscription | any;
  isLoading: boolean = false;
  searchTerm!: string;
  searchForm = this.fb.group({
    search: '',
  });

  get search() {
    return this.searchForm.get('search');
  }

  constructor(
    private fb: FormBuilder,
    private placeService: TravelDataService
  ) {
    this.getPlaceList = new Subscription();
  }
  ngOnInit() {
    this.search?.valueChanges
      .pipe(
        debounceTime(1500),
        distinctUntilChanged(),
        switchMap((name) => this.placeService.searchPlaceList(name || ''))
      )
      .subscribe((plcList) => {
        this.places = plcList;
      });
    this.loadPlacesData();
  }

  loadPlacesData() {
    this.getPlaceList = this.placeService
      .getPlaceListFromMockAPI()
      .subscribe((plcList) => {
        this.places = plcList;
      });
  }

  ngOnDestroy() {
    console.log('Destory');
    // this.getPlaceList.unsubscribe();
    if (this.getPlaceList) {
      this.getPlaceList.unsubscribe();
    }
  }

  delete(idx: number) {
    this.places.splice(idx, 1);
  }
  onNewItems(newItems: place[]): void {
    if (newItems.length === 0) {
      this.places = []; // Reset the list if an empty array is received
    } else {
      this.places = [...this.places, ...newItems];
    }
  }

  onLoadingChange(isLoading: boolean): void {
    this.isLoading = isLoading;
  }
}
