import { Injectable } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { GeoJson } from '../models/map.model';
import { Observable } from 'rxjs';

@Injectable()
export class MapService {

  private markersCollection: AngularFirestoreCollection<GeoJson>
  markers: Observable<GeoJson[]>

  constructor(private firestore: AngularFirestore) {
    mapboxgl.accessToken = environment.mapbox.accessToken
    this.markersCollection = this.firestore.collection<GeoJson>('markers')
    this.markers = this.markersCollection.valueChanges()
  }

  createMarker({properties, type, geometry}: GeoJson) {
    const data: GeoJson = {
      properties,
      type,
      geometry
    }
    return this.firestore.collection<GeoJson>('markers').add(data)
  }

  removeMarker($key) {
    console.log($key)
    const markerRef: AngularFirestoreDocument<GeoJson> = this.firestore.doc(`markers/${$key}`)
    return markerRef.delete()
  }

}
