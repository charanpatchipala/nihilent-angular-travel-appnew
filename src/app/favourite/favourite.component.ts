import { Component } from '@angular/core';
import { place } from '../app.component';
import { TravelDataService } from '../travel-data.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent {
  places: Array<place> = [];
  getPlaceList: Subscription | any;
  constructor(private placeService: TravelDataService) {
    this.getPlaceList = new Subscription();
  }
  ngOnInit() {
    this.loadPlacesData();
  }
  loadPlacesData() {
    this.getPlaceList = this.placeService
      .getfavourite()
      .subscribe((plcList) => {
        this.places = plcList;
        // this.applySorting();
      });
  }
}
