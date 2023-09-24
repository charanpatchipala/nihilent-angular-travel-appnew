import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelDataService } from '../travel-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { place } from '../app.component';

@Component({
  selector: 'app-placedetail',
  templateUrl: './placedetail.component.html',
  styleUrls: ['./placedetail.component.scss'],
})
export class PlacedetailComponent {
  id: string = '';
  place: any;

  places: Array<place> = [];
  getPlaceById: Subscription | any;
  constructor(
    private router: ActivatedRoute,
    private placeService: TravelDataService,
    private sanitizer: DomSanitizer
  ) {
    const { id } = this.router.snapshot.params;
    this.id = id;

    console.log(placeService.getPlaces());
    console.log(this.id);
  }

  ngOnInit() {
    this.placeService.getPlaceById(this.id).subscribe((plc: any) => {
      console.log(plc);
      this.place = plc;
      this.place.placevlog = this.sanitizer.bypassSecurityTrustResourceUrl(
        plc.placevlog
      );
    });
  }

  show = true;
  toggledescription() {
    this.show = !this.show;
  }
}
