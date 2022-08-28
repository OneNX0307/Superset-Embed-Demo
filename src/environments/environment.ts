// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  superset: {
    baserUrl: "http://192.168.2.109:8088/",
    securityApi: "http://192.168.2.109:8088/api/v1/security/",
    dashboardId: "34b2bd39-dfe8-4311-8147-029cb64e7f34",
    username: 'admin',
    password: 'admin'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
