import { Component } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelDataService } from '../travel-data.service';
import { place } from '../app.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-editplace',
  templateUrl: './editplace.component.html',
  styleUrls: ['./editplace.component.scss'],
})
export class EditplaceComponent {
  id: string = '';
  separatorKeysCodes: number[] = [ENTER, COMMA];

  placeForm = this.fb.group({
    destination: ['', [Validators.required, Validators.minLength(5)]],
    accommodation: ['', [Validators.required, Validators.minLength(5)]],
    popular: [false],
    rating: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
    date: ['', [Validators.required]],
    like: 0,
    dislike: 0,

    activities: this.fb.array([]),

    place: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^http.*'),
      ],
    ],
    suggestions: ['', [Validators.required, Validators.minLength(20)]],
    description: ['', [Validators.required, Validators.minLength(20)]],
    placevlog: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^http.*'),
      ],
    ],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private placeService: TravelDataService,
    private router: Router
  ) {
    const { id } = this.route.snapshot.params;
    this.id = id;
  }

  ngOnInit() {
    this.placeService.getPlaceById(this.id).subscribe((plc: any) => {
      console.log(plc);
      this.placeForm.patchValue(plc);

      plc.activities.forEach((name: string) => {
        this.activities.push(this.fb.control(name));
      });
    });
  }

  get destination() {
    return this.placeForm?.get('destination');
  }

  get description() {
    return this.placeForm?.get('description');
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

  get suggestions() {
    return this.placeForm?.get('instructions');
  }

  get placevlog() {
    return this.placeForm?.get('this.placevlog');
  }

  get activities() {
    return this.placeForm.get('activities') as FormArray;
  }

  addactivities(event: MatChipInputEvent) {
    const name = (event.value || '').trim();
    if (name) {
      this.activities.push(this.fb.control(name));
    }

    event.chipInput!.clear();
  }

  removeactivities(index: number) {
    this.activities.removeAt(index);
  }

  UpdatePlace() {
    console.log(this.placeForm.status);

    if (this.placeForm.valid) {
      const updatedPlace = this.placeForm.value;
      console.log(updatedPlace);

      this.placeService
        .updatePlace(updatedPlace as place, this.id)
        .subscribe(() => {
          this.router.navigate(['/travels']);
        });
    }
  }
  // id: string = '';
  // separatorKeysCodes: number[] = [ENTER, COMMA];

  // placeForm = this.fb.group({
  //   destination: ['', [Validators.required, Validators.minLength(5)]],
  //   popular: false,
  //   rating: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
  //   place: [
  //     '',
  //     [
  //       Validators.required,
  //       Validators.minLength(5),
  //       Validators.pattern('^http.*'),
  //     ],
  //   ],
  //   accommodation: ['', [Validators.required, Validators.minLength(5)]],
  //   description: ['', [Validators.required, Validators.minLength(20)]],
  //   suggestions: ['', [Validators.required, Validators.minLength(20)]],
  //   date: '',
  //   activities: this.fb.array([]),
  //   like: 0,
  //   dislike: 0,
  //   placevlog: [
  //     '',
  //     [
  //       Validators.required,
  //       Validators.minLength(5),
  //       Validators.pattern('^http.*'),
  //     ],
  //   ],
  // });

  // // places;
  // // DI - Dependency Injection
  // constructor(
  //   private route: ActivatedRoute,
  //   private placeService: TravelDataService,
  //   private router: Router,
  //   private fb: FormBuilder
  // ) {
  //   const { id } = this.route.snapshot.params;
  //   this.id = id;
  //   // this.places = placeService.getPlaces();
  // }
  // ngOnInit() {
  //   this.placeService.getPlaceById(this.id).subscribe((plc) => {
  //     console.log(plc);
  //     this.placeForm.patchValue(plc);

  //     // this.cast.forEach((cast)=>this.existingCast.push(cast))
  //     plc.activities.forEach((activity: string) => {
  //       this.activities.push(this.fb.control(activity));
  //     });
  //   });
  // }
  // get destination() {
  //   return this.placeForm?.get('destination');
  // }

  // get accommodation() {
  //   return this.placeForm?.get('accommodation');
  // }
  // get rating() {
  //   return this.placeForm?.get('rating');
  // }

  // get place() {
  //   return this.placeForm?.get('place');
  // }

  // get description() {
  //   return this.placeForm?.get('description');
  // }

  // get suggestions() {
  //   return this.placeForm?.get('suggestions');
  // }
  // get placevlog() {
  //   return this.placeForm?.get('placevlog');
  // }

  // get activities() {
  //   return this.placeForm.get('activities') as FormArray;
  // }

  // addactivitiesName(event: MatChipInputEvent) {
  //   const name = (event.value || '').trim();
  //   if (name) {
  //     this.activities.push(this.fb.control(name));
  //   }

  //   event.chipInput!.clear();
  // }

  // removeactivitiesName(index: number) {
  //   this.activities.removeAt(index);
  // }

  // updatePlace() {
  //   console.log(this.placeForm.status);

  //   if (this.placeForm.valid) {
  //     const updatedPlace = this.placeForm.value;
  //     console.log(updatedPlace);
  //     // this.movieService.updateMovie(updatedMovie as Movie);

  //     this.placeService
  //       .updatePlace(updatedPlace as place, this.id)
  //       .subscribe(() => {
  //         this.router.navigate(['/travels']);
  //       });
  //   }
}

// editPlace() {
//   console.log(this.placeForm.status);

//   if (this.placeForm.valid) {
//     const updatePlace = this.placeForm.value;
//     console.log(updatePlace);

//     this.placeService.addPlace(updatePlace as place).subscribe(() => {
//       this.router.navigate(['/travels']);
//     });
//   }
// }
