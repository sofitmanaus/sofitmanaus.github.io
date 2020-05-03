// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDJI6L5sk_-nZYXFzNaNvzvRcp4IxEMsk0",
    authDomain: "sofit-d7d06.firebaseapp.com",
    databaseURL: "https://sofit-d7d06.firebaseio.com",
    projectId: "sofit-d7d06",
    storageBucket: "sofit-d7d06.appspot.com",
    messagingSenderId: "212968233581",
    appId: "1:212968233581:web:19d2903c20d3096e7cfd64",
    measurementId: "G-4EGNC752E7"
  },
  mapbox: {
    accessToken: 'pk.eyJ1Ijoia3Jpc2FuZHJlNyIsImEiOiJjazlvNWhubGwwMWVrM2RxcGYwaHBpYWN2In0.Ql-1vpo5eTZJXmj5D5augw'
  },
  APP: {
    NAME: 'Sofit',
    OWNER: '@sofitmanaus',
    CONTACT: 'kris.andre7@gmail.com',
    VERSION: '0.0.1'
  },
  API: {
      BASE_URL: 'https://sofitmanaus.github.io'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
