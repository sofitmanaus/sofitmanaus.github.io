// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAvzCPYkklyyM1ekzqNGU0fCa5vZnBODAY",
    authDomain: "sofit-dev.firebaseapp.com",
    databaseURL: "https://sofit-dev.firebaseio.com",
    projectId: "sofit-dev",
    storageBucket: "sofit-dev.appspot.com",
    messagingSenderId: "638795815473",
    appId: "1:638795815473:web:b673ee06a204d5af2b9310",
    measurementId: "G-CE8QR59R6T"
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
      BASE_URL: 'https://sofitmanaus.com.br/'
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
