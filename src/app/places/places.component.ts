import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TravelDataService } from '../travel-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent {
  constructor(
    private router: Router,
    private movieService: TravelDataService,
    private dialog: MatDialog
  ) {}
}
