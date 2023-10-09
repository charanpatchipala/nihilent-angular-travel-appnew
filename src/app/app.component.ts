import { Component } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { TravelDataService } from './travel-data.service';

type place = {
  id: string;
  destination: string;
  date: string;
  popular: boolean;
  rating: number;
  description: string;
  placevlog: string;
  like: number;
  dislike: number;
  activities: Array<string>;
  suggestions: string;
  accommodation: string;
  place: string;
  favourite: boolean;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
class AppComponent {
  title = 'nihilent-angular-travel-appnew';
}
export { place, AppComponent };
