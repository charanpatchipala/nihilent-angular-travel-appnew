import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { place, AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TravelDataService {
  places: Array<place> = [];
  constructor(private http: HttpClient) {}

  getPlaces() {
    return this.places;
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
}
