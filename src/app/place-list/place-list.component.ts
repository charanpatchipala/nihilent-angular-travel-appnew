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
@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss'],
})
export class PlaceListComponent {
  places: Array<place> = [];
  getPlaceList: Subscription | any;

  searchForm = this.fb.group({
    search: '',
  });

  get search() {
    return this.searchForm.get('search');
  }

  constructor(
    private fb: FormBuilder,
    private placeService: TravelDataService
  ) {}
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
    this.getPlaceList.unsubscribe();
  }

  delete(idx: number) {
    this.places.splice(idx, 1);
  }
}
