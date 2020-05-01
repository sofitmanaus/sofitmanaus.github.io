import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/core/services/map.service';
import { GeoJson } from 'src/app/core/models/map.model';
import { featureCollection, point, feature } from '@turf/helpers'
import { LngLatLike, Map, NavigationControl, LngLat } from 'mapbox-gl';
import { Position, FeatureCollection } from 'geojson';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RouteDataModel } from 'src/app/core/models/route-data.model';
@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit{

  /// default settings
  map: Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 37.75;
  lng = -122.41;
  message = 'Hello World!';

  // data
  source: any;
  markers: any;

  truckLocationPos: Position;
  truckLocationLat: LngLatLike;
  pointHopper = {};
  dropoffs: FeatureCollection = featureCollection([]);
  nothing: FeatureCollection = featureCollection([]);

  constructor(private mapService: MapService, private http: HttpClient) {
  }

  ngOnInit() {
    this.markers = this.mapService.markers
    this.initializeMap()
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.truckLocationPos = [this.lng, this.lat];
        console.log(this.truckLocationPos)
        this.truckLocationLat = [this.lng, this.lat];

        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }

    this.buildMap()

  }

  newDropoff(coords: LngLat) {
    // Store the clicked point as a new GeoJSON feature with
    // two properties: `orderTime` and `key`
    let pt = point(
      [coords.lng, coords.lat],
      {
        orderTime: Date.now(),
        key: Math.random()
      }
    );
    this.dropoffs.features.push(pt);
    this.pointHopper[pt.properties.key] = pt;

    // Make a request to the Optimization API
    this.http.get(this.assembleQueryURL()).subscribe((data: RouteDataModel) => {
      // Create a GeoJSON feature collection
      let routeGeoJSON = featureCollection([feature(data.trips[0].geometry)]);

      // If there is no route provided, reset
      if (!data.trips[0]) {
        routeGeoJSON = this.nothing;
      } else {
        // Update the `route` source by getting the route source
        // and setting the data equal to routeGeoJSON
        this.map.getSource('route')
            // @ts-ignore
          .setData(routeGeoJSON);
      }

      if (data.waypoints.length === 12) {
        window.alert('Maximum number of points reached. Read more at docs.mapbox.com/api/navigation/#optimization.');
      }
    });
  }

  updateDropoffs(geojson) {
    // @ts-ignore
    this.map.getSource('dropoffs-symbol').setData(geojson);
  }

  assembleQueryURL() {

    let lastAtRestaurant = 0;
    let restaurantIndex = 0;
    let keepTrack = [];

    // Store the location of the truck in a variable called coordinates
    let coordinates = [this.truckLocationLat];
    let distributions = [];
    keepTrack = [this.truckLocationLat];

    // Create an array of GeoJSON feature collections for each point
    let restJobs = this.objectToArray(this.pointHopper);

    // If there are any orders from this restaurant
    if (restJobs.length > 0) {

      // Check to see if the request was made after visiting the restaurant
      let needToPickUp = restJobs.filter((d, i) => {
        return d.properties.orderTime > lastAtRestaurant;
      }).length > 0;

      // If the request was made after picking up from the restaurant,
      // Add the restaurant as an additional stop
      // if (needToPickUp) {
      //   restaurantIndex = coordinates.length;
      //   // Add the restaurant as a coordinate
      //   coordinates.push(this.warehouseLocationLat);
      //   // push the restaurant itself into the array
      //   keepTrack.push(this.pointHopper.warehouse);
      // }

      restJobs.forEach((d, i) => {
        // Add dropoff to list
        keepTrack.push(d);
        coordinates.push(d.geometry.coordinates);
        // if order not yet picked up, add a reroute
        if (needToPickUp && d.properties.orderTime > lastAtRestaurant) {
          distributions.push(restaurantIndex + ',' + (coordinates.length - 1));
        }
      });
    }

    // Set the profile to `driving`
    // Coordinates will include the current location of the truck,
    return 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/' + coordinates.join(';') + '?distributions=' + distributions.join(';') + '&overview=full&steps=true&geometries=geojson&source=first&access_token=' + environment.mapbox.accessToken;
  }

  objectToArray(obj) {
    let keys = Object.keys(obj);
    let routeGeoJSON = keys.map(key => {
      return obj[key];
    });
    return routeGeoJSON;
  }

  buildMap() {
    this.map = new Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
      center: [-60.00893, -3.09369], // starting position
      zoom: 16 // starting zoom
    });


    /// Add map controls
    this.map.addControl(new NavigationControl());


    //// Add Marker on Click
    // this.map.on('click', (event) => {
    //   const coordinates = [event.lngLat.lng, event.lngLat.lat]
    //   const newMarker   = new GeoJson(coordinates, { message: this.message })
    //   this.mapService.createMarker(newMarker)
    // })
    this.map.on('click', e => {
      // When the map is clicked, add a new drop-off point
      // and update the `dropoffs-symbol` layer
      this.newDropoff(e.lngLat);
      this.updateDropoffs(this.dropoffs);
    });


    /// Add realtime firebase data on map load
    this.map.on('load', (event) => {

      let truckMarker = featureCollection([point(this.truckLocationPos)]);

      this.map.addLayer({
        id: 'truckMarker',
        type: 'circle',
        source: {
          data: truckMarker,
          type: 'geojson'
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#3887be',
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 3
        }
      });

      this.map.addLayer({
        id: 'dropoffs-symbol',
        type: 'symbol',
        source: {
          data: this.dropoffs,
          type: 'geojson'
        },
        layout: {
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'icon-image': 'marker-15',
        }
      });

      this.map.addSource('route', {
        type: 'geojson',
        data: this.nothing
      });

      this.map.addLayer({
        id: 'routeline-active',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': [
            "interpolate",
            ["linear"],
            ["zoom"],
            12, 3,
            22, 12
          ]
        }
      }, 'waterway-label');

      this.map.addLayer({
        id: 'routearrows',
        type: 'symbol',
        source: 'route',
        layout: {
          'symbol-placement': 'line',
          'text-field': '▶',
          'text-size': [
            "interpolate",
            ["linear"],
            ["zoom"],
            12, 24,
            22, 60
          ],
          'symbol-spacing': [
            "interpolate",
            ["linear"],
            ["zoom"],
            12, 30,
            22, 160
          ],
          'text-keep-upright': false
        },
        paint: {
          'text-color': '#3887be',
          'text-halo-color': 'hsl(55, 11%, 96%)',
          'text-halo-width': 3
        }
      }, 'waterway-label');

    //   /// register source
    //   this.map.addSource('firebase', {
    //      type: 'geojson',
    //      data: {
    //        type: 'FeatureCollection',
    //        features: []
    //      }
    //   });

    //   /// get source
    //   this.source = this.map.getSource('firebase')

    //   /// subscribe to realtime database and set data source
    //   this.markers.subscribe(markers => {
    //       let data = new FeatureCollection(markers)
    //       this.source.setData(data)
    //   })

    //   /// create map layers with realtime data
    //   this.map.addLayer({
    //     id: 'firebase',
    //     source: 'firebase',
    //     type: 'symbol',
    //     layout: {
    //       'text-field': '{message}',
    //       'text-size': 24,
    //       'text-transform': 'uppercase',
    //       'icon-image': 'rocket-15',
    //       'text-offset': [0, 1.5]
    //     },
    //     paint: {
    //       'text-color': '#f16624',
    //       'text-halo-color': '#fff',
    //       'text-halo-width': 2
    //     }
    //   })

    })

  }

  /// Helpers

  removeMarker(marker) {
    this.mapService.removeMarker(marker)
  }

  flyTo(data: GeoJson) {
    const fly: LngLatLike = [data.geometry.coordinates[0], data.geometry.coordinates[1]];
    this.map.flyTo({
      center: fly
    })
  }
}
