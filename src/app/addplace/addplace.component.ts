import { Component } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { TravelDataService } from '../travel-data.service';
import { place } from '../app.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-addplace',
  templateUrl: './addplace.component.html',
  styleUrls: ['./addplace.component.scss'],
})
export class AddplaceComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  placeForm = this.fb.group({
    destination: ['', [Validators.required, Validators.minLength(5)]],
    popular: false,
    rating: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
    place: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^http.*'),
      ],
    ],
    accommodation: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(20)]],
    suggestions: ['', [Validators.required, Validators.minLength(20)]],
    date: ['', [Validators.required]],
    activities: this.fb.array(['']),
    like: [0],
    dislike: [0],
    placevlog: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^http.*'),
      ],
    ],
  });

  places;
  // DI - Dependency Injection
  constructor(
    private placeService: TravelDataService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.places = placeService.getPlaces();
  }

  get destination() {
    return this.placeForm?.get('destination');
  }

  get accommodation() {
    return this.placeForm?.get('accommodation');
  }
  get rating() {
    return this.placeForm?.get('rating');
  }

  get place() {
    return this.placeForm?.get('place');
  }

  get description() {
    return this.placeForm?.get('description');
  }

  get suggestions() {
    return this.placeForm?.get('suggestions');
  }
  get placevlog() {
    return this.placeForm?.get('placevlog');
  }

  get activities() {
    return this.placeForm.get('activities') as FormArray;
  }

  addactivitiesName(event: MatChipInputEvent) {
    const name = (event.value || '').trim();
    if (name) {
      this.activities.push(this.fb.control(name));
    }

    event.chipInput!.clear();
  }

  removeactivitiesName(index: number) {
    this.activities.removeAt(index);
  }

  addPlace() {
    console.log(this.placeForm.status);

    if (this.placeForm.valid) {
      const newPlace = this.placeForm.value;
      console.log(newPlace);

      this.placeService.addPlace(newPlace as place).subscribe(() => {
        this.router.navigate(['/travels']);
      });
    }
  }
}
