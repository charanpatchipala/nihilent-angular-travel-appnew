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
  pagesize = 2;
  currentpage = 0;
  totalItems = 0;
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

  // onpagechange(event: PageEvent) {
  //   this.currentpage = event.pageIndex;
  //   this.pagenavlist();
  // }
  // // pagenavlist() {
  // //   const startIndex = this.currentpage * this.pagesize;
  // //   const endIndex = startIndex + this.pagesize;
  // //   this.places = this.places.splice(startIndex, endIndex);
  // // }
}
