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
import { MatSelectChange } from '@angular/material/select';
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
  sortType: string = 'rating';
  order: string = 'asc'; // asc or desc
  get search() {
    return this.searchForm.get('search');
  }

  constructor(
    private fb: FormBuilder,
    private placeService: TravelDataService
  ) {
    this.searchForm = this.fb.group({
      search: '',
    });
    this.getPlaceList = new Subscription();
    this.sortType = 'default'; // Initialize to default
    this.order = ''; // Initialize to an empty string
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
        this.applySorting();
      });
    // this.loadPlacesData();
  }

  loadPlacesData() {
    this.getPlaceList = this.placeService
      .getPlaceListFromMockAPI()
      .subscribe((plcList) => {
        this.places = plcList;
        this.applySorting();
      });
  }

  ngOnDestroy() {
    console.log('Destory');
    // this.getPlaceList.unsubscribe();
    if (this.getPlaceList) {
      this.getPlaceList.unsubscribe();
      this.applySorting();
    }
  }
  onCancel() {
    // this.searchForm.controls.search.setValue('');
    const searchControl = this.searchForm.get('search');
    if (searchControl) {
      searchControl.setValue('');
    }
  }

  delete(idx: number) {
    this.places.splice(idx, 1);
  }
  onSortChange(event: MatSelectChange): void {
    this.sortType = event.value;
    this.applySorting();
  }
  onOrderChange(event: MatSelectChange): void {
    this.order = event.value;
    this.applySorting();
  }
  // resetAndLoad() {
  //   this.loadMoreData();
  // }
  applySorting() {
    if (this.sortType && this.order) {
      // Implement sorting logic based on this.sortType and this.order
      this.places.sort((a: place, b: place) => {
        const sortOrder = this.order === 'asc' ? 1 : -1;
        if (this.sortType === 'destination') {
          return a.destination.localeCompare(b.destination) * sortOrder;
        } else if (this.sortType === 'rating') {
          return (a.rating - b.rating) * sortOrder;
        } else if (this.sortType === 'date') {
          // You might need to parse dates and compare them appropriately
          // Example:
          return (
            new Date(a.date).getTime() - new Date(b.date).getTime() * sortOrder
          );
        }
        return 0;
      });
    }
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
