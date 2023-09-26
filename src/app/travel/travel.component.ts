import { Component, EventEmitter, Input, Output } from '@angular/core';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { place } from '../app.component';
import { Router } from '@angular/router';
import { TravelDataService } from '../travel-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss'],
})
export class TravelComponent {
  @Input() Place: place = {
    id: '',
    destination: '',
    date: '',
    popular: false,
    rating: 5,
    description: '',
    placevlog: '',
    like: 0,
    dislike: 0,
    activities: [''],
    suggestions: '',
    accommodation: '',
    place: '',
  };

  @Input() idx: number = 0;
  @Output() rmvPlace = new EventEmitter();
  likeSubject = new Subject<number>();
  disLikeSubject = new Subject<number>();

  show = true;

  constructor(
    private router: Router,
    private placeService: TravelDataService,
    private dialog: MatDialog
  ) {
    this.likeSubject
      .pipe(
        debounceTime(1000),
        switchMap((count) => {
          this.Place = { ...this.Place, like: count };
          return this.placeService.updatePlace(this.Place, this.Place.id);
        })
      )
      .subscribe();
    this.disLikeSubject
      .pipe(
        debounceTime(1000),
        switchMap((count) => {
          this.Place = { ...this.Place, dislike: count };
          return this.placeService.updatePlace(this.Place, this.Place.id);
        })
      )
      .subscribe();
  }

  openConfirmDialog() {
    return this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: { message: 'Are you sure you want to delete this place?' },
    });
  }

  // Delete -> Refresh data
  delPlace() {
    this.openConfirmDialog()
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.deletePlace();
        }
      });
  }
  deletePlace() {
    this.placeService.deletePlaceById(this.Place.id).subscribe(() => {
      console.log('place deleted successfully');
      this.rmvPlace.emit();
    });
  }

  updateLikes(count: number) {
    this.likeSubject.next(count);
  }

  updateDislikes(count: number) {
    this.disLikeSubject.next(count);
  }

  editPlace() {
    this.router.navigate(['/places/edit', this.Place.id]);
  }
  toggle() {
    this.show = !this.show;
  }
  getdetails() {
    this.router.navigate(['/places', this.Place.id]);
  }
}
