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
    //@ts-ignore
    mapboxgl.accessToken  = environment.mapbox.accessToken
    this.markersCollection = this.firestore.collection<GeoJson>('markers')
    this.markers = this.markersCollection.valueChanges()
  }

  createMarker({properties, type, geometry}: GeoJson) {
    const markerDoc: AngularFirestoreDocument<GeoJson> = this.firestore.collection<GeoJson>('markers').doc(this.firestore.createId())
    properties['id'] = markerDoc.ref.id
    const data: GeoJson = {
      properties: properties,
      type,
      geometry
    }
    return markerDoc.set(data)
  }

  removeMarker(marker: GeoJson) {
    const markerRef: AngularFirestoreDocument<GeoJson> = this.firestore.doc(`markers/${marker.properties.id}`)
    return markerRef.delete()
  }

}
