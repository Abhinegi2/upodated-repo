import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { fuseConfig } from 'app/fuse-config';
import { DatePipe, PlatformLocation, APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';
import 'hammerjs';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';

import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import { LoaderComponent } from './common/loader/loader.component';
import { LoaderInterceptor } from './common/loader/loader.interceptor';
import { LoaderService } from './common/loader/loader.service';

import { BaseService } from './services/base.service';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';
import { ShowDialogComponent } from './common/show-dialog/show-dialog.component';
import { DialogService } from './common/confirm-dialog/dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { ProgressBarModelComponent } from './common/progress-bar-model/progress-bar-model.component';
import { HttpService } from './services/http.service';
import { IgmiteModule } from './main/igmite.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from './fake-db/fake-db.service';
import { ProjectDashboardModule } from './dashboards/dashboard.module';
import { CookieService } from 'ngx-cookie-service';

export const MY_FORMATS = {
    parse: {
        dateInput: "DD/MM/YYYY"
    },
    display: {
        dateInput: "DD/MM/YYYY",
        monthYearLabel: "MM YYYY",
        dateA11yLabel: "DD/MM/YYYY",
        monthYearA11yLabel: "MM YYYY"
    }
};

export function getBaseHref(platformLocation: PlatformLocation): string {
    return platformLocation.getBaseHrefFromDOM();
}

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'login' }, // otherwise redirect to summary-dashboard
];

@NgModule({
    declarations: [
        AppComponent,
        LoaderComponent,
        ConfirmDialogComponent,
        ShowDialogComponent,
        ProgressBarModelComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        NgIdleKeepaliveModule.forRoot(),

        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatDialogModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        IgmiteModule,
        ProjectDashboardModule
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        DatePipe,
        BaseService,
        DialogService,
        HttpService,
        CookieService, 
        LoaderService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        },
        { provide: MAT_DATE_LOCALE, useValue: "en_IN" }, //you can change useValue
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        {
            provide: APP_BASE_HREF,
            useFactory: getBaseHref,
            deps: [PlatformLocation]
        },
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
    ],
    entryComponents: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {
    static injector: Injector;

    constructor(injector: Injector) {
        AppModule.injector = injector;
    }
}
