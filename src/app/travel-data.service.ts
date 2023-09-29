import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { place, AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HttpParams } from '@angular/common/http';
const API = 'https://64f6f41e9d7754084952d8a0.mockapi.io/travels';
@Injectable({
  providedIn: 'root',
})
export class TravelDataService {
  places: Array<place> = [];
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  getPlaces() {
    return this.places;
  }

  // getpageListPagination(page: number, limit: number, searchTerm: string='', sortBy:string='',order='') {

  //   let url = `${API}?limit=${limit}&page=${page}`;
  //   if (searchTerm) {
  //     url += `&search=${searchTerm}`;
  //   }

  //   return this.http.get<place[]>(url);
  // }

  getpageListPagination(
    page: number,
    limit: number,
    search: string = '',
    sortBy: string = '',
    order = ''
  ) {
    let params = new HttpParams()
      .set('limit', limit)
      .set('page', page)
      .set('search', search)
      .set('sortBy', sortBy)
      .set('order', order);

    return this.http.get<place[]>(API, { params });
  }

  getPlaceListFromMockAPI() {
    return this.http.get<place[]>(
      'https://64f6f41e9d7754084952d8a0.mockapi.io/travels'
    );
  }

  searchPlaceList(name: string) {
    return this.http.get<place[]>(
      `https://64f6f41e9d7754084952d8a0.mockapi.io/travels?search=${name}`
    );
  }

  getPlaceById(id: string) {
    return this.http.get<place>(
      `https://64f6f41e9d7754084952d8a0.mockapi.io/travels/${id}`
    );
  }

  addPlace(newPlace: place) {
    return this.http.post(
      `https://64f6f41e9d7754084952d8a0.mockapi.io/travels`,
      newPlace
    );
  }

  updatePlace(updatePlace: place, id: string) {
    return this.http.put(
      `https://64f6f41e9d7754084952d8a0.mockapi.io/travels/${id}`,
      updatePlace
    );
  }

  deletePlaceById(id: string) {
    return this.http.delete<place>(
      `https://64f6f41e9d7754084952d8a0.mockapi.io/travels/${id}`
    );
  }

  setPlaces(newPlace: place) {
    this.places.push(newPlace);
  }

  openConfirmDialog() {
    return this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: { message: 'Are you sure you want to delete this movie?' },
    });
  }
}
