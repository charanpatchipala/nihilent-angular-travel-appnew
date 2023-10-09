import { Component } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
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
  previousSearches: string[] = [];
  filteredOptions!: Observable<string[]>;
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
    this.filteredOptions = this.searchForm.get('search')!.valueChanges.pipe(
      startWith(''),
      debounceTime(1500),
      distinctUntilChanged(),
      switchMap((name) => {
        const searchName = name || ''; // Default to an empty string if 'name' is null
        this.searchTerm = searchName;

        return this.placeService.searchPlaceList(searchName);
      }),
      map((plc) => plc.map((rc) => rc.destination))
    );

    // this.loadReceipesData();
  }

  loadPlacesData() {
    this.getPlaceList = this.placeService
      .getPlaceListFromMockAPI()
      .subscribe((plcList) => {
        this.places = plcList;
        // this.applySorting();
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
    this.places = this.places.filter((plc) => {
      const matchesSearch =
        !this.searchTerm ||
        plc.destination.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesSearch;
    });

    if (this.sortType && this.order) {
      // Implement sorting logic based on this.sortType and this.order
      this.places.sort((a: place, b: place) => {
        const sortOrder = this.order === 'asc' ? 1 : -1;
        if (this.sortType === 'destination') {
          return a.destination.localeCompare(b.destination) * sortOrder;
        } else if (this.sortType === 'rating') {
          return (a.rating - b.rating) * sortOrder;
        } else if (this.sortType === 'date') {
          return (
            (new Date(a.date).getMonth() - new Date(b.date).getMonth()) *
            sortOrder
          );
        }
        return 0;
      });
    }
  }

  onNewItems(newItems: place[]): void {
    // Create a set of existing place IDs for quick look-up
    const existingPlaceIds = new Set(this.places.map((place) => place.id));

    // Filter out new items that have IDs already in the existing places
    const uniqueNewItems = newItems.filter(
      (newItem) => !existingPlaceIds.has(newItem.id)
    );

    // Concatenate the unique new items with the existing places
    this.places = [...this.places, ...uniqueNewItems];

    this.applySorting();
  }

  onLoadingChange(isLoading: boolean): void {
    this.isLoading = isLoading;
  }
  clearSearch() {
    this.searchForm.get('search')?.setValue('');
  }
}
