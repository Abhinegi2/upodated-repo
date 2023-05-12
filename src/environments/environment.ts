export const environment = {
    hmr: false,
    uat: false,
    demo: false,
    lahi: false,
    gj: false,
    mh: false,
    dl: true,
    jh: false,
    od: false,
    production: false,
    target: "dl",
    email: "support.dl.lighthouse@lend-a-hand-India.org",
    version: "3.0",
    ApiBaseUrl: "http://localhost:5013/LighthouseServices/"
    // ApiBaseUrl: "https://stg-dl.lighthouse.net.in/LighthouseServices/"
    //ApiBaseUrl: "https://delhi.lighthouse.net.in/LighthouseServices/"
};

/* Build Project => ng build --prod --c/configuration=lahi  lahi | uat | gujarat | mh
 * ng build --prod --c/configuration=lahi
 * ng serve --c/configuration=lahi
 * node --max_old_space_size=8048 ./node_modules/@angular/cli/bin/ng serve --open --c=mh
 * node --max_old_space_size=8048 ./node_modules/@angular/cli/bin/ng build --prod --c=mh --outputHashing=all
 *
 * export NODE_OPTIONS="--max-old-space-size=8192"

 * ADM: rakesh.gtmcs@gmail.com      VC: amit.patil@icagroup.in/amarmondhe.lnet@gmail.com       VT: ashukarane264@gmail.com
 */

/* This file can be replaced during build by using the `fileReplacements` array.
 * `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
 * The list of file replacements can be found in `angular.json`.

 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.

 * import 'zone.js/dist/zone-error';  // Included with Angular CLI.
 */

// Staging Lighthouse Urls : 15.206.8.219
// http://stg-mh.lighthouse.net.in      http://stg-gj.lighthouse.net.in     http://stg-jh.lighthouse.net.in     http://stg-od.lighthouse.net.in
// http://uat.lighthouse.net.in         http://demo.lighthouse.net.in       http://lahi.lighthouse.net.in

// This option can take one of the following sub-commands:
// app-shell, application, class, component, directive, enum, guard, interceptor, interface, library, module, pipe, resolver, service, service-worker, web-worker
// https://angular.io/cli/generate#component-command

// ng generate component <name> [options]
// ng generate component main/setting  --module=/src/app/main/igmite.module