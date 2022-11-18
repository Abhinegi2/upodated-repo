import { Component, Inject, OnDestroy, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './auth/login/login.service';
import { AuthenticationService } from './services/authentication.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProgressBarModelComponent } from './common/progress-bar-model/progress-bar-model.component';
import { Idle, EventTargetInterruptSource } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { filter } from 'rxjs/operators';
import { UrlService } from 'app/common/shared/url.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  fuseConfig: any;
  navigation: any;

  title = 'Session Timeout Demo';
  idleState = 'NOT_STARTED';
  timedOut = false;
  lastPing?: Date = null;
  progressBarPopup: MatDialogRef<ProgressBarModelComponent>;
  previousUrl: string = null;
  currentUrl: string = null;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {DOCUMENT} document
   * @param {FuseConfigService} _fuseConfigService
   * @param {FuseNavigationService} _fuseNavigationService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {FuseSplashScreenService} _fuseSplashScreenService
   * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
   * @param {Platform} _platform
   * @param {TranslateService} _translateService
   */
  constructor(
    @Inject(DOCUMENT) private document: any,
    private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseSidebarService: FuseSidebarService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _translateService: TranslateService,
    private _platform: Platform,
    private element: ElementRef,
    private idle: Idle,
    private keepalive: Keepalive,
    private dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService,
    private urlService: UrlService
  ) {    
    // Get default navigation
    //this.navigation = navigation;

    // Register the navigation to the service
    //this._fuseNavigationService.register('main', this.navigation);

    // Set the main navigation as our current navigation
    //this._fuseNavigationService.setCurrentNavigation('main');

    // Add languages
    this._translateService.addLangs(['en', 'tr']);

    // Set the default language
    this._translateService.setDefaultLang('en');

    // Set the navigation translations
    this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

    // Use a language
    this._translateService.use('en');

    /**
     * ----------------------------------------------------------------------------------------------------
     * ngxTranslate Fix Start
     * ----------------------------------------------------------------------------------------------------
     */

    /**
     * If you are using a language other than the default one, i.e. Turkish in this case,
     * you may encounter an issue where some of the components are not actually being
     * translated when your app first initialized.
     *
     * This is related to ngxTranslate module and below there is a temporary fix while we
     * are moving the multi language implementation over to the Angular's core language
     * service.
     **/

    // Set the default language to 'en' and then back to 'tr'.
    // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
    // been selected and there is no way to force it, so we overcome the issue by switching
    // the default language back and forth.
    /**
     setTimeout(() => {
        this._translateService.setDefaultLang('en');
        this._translateService.setDefaultLang('tr');
     });
     */

    /**
     * ----------------------------------------------------------------------------------------------------
     * ngxTranslate Fix End
     * ----------------------------------------------------------------------------------------------------
     */

    // Add is-mobile class to the body if the platform is mobile
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    // Started : Session Timeout        
    // sets an idle timeout of 15 minutes (900 Seconds).
    idle.setIdle(25);
    // sets a timeout period of 5 minutes (300 Seconds).
    idle.setTimeout(10);
    // sets the interrupts like Keydown, scroll, mouse wheel, mouse down, and etc
    idle.setInterrupts([new EventTargetInterruptSource(this.element.nativeElement, 'keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll')]);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'NO_LONGER_IDLE';
      console.log('Idle stage 1');
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'TIMED_OUT';
      this.timedOut = true;

      console.log('Idle stage 2');
      this.closeProgressForm();
    });

    idle.onIdleStart.subscribe(() => {
      console.log('Idle stage 3');
      this.idleState = 'IDLE_START', this.openProgressForm(1);
    });

    idle.onTimeoutWarning.subscribe((countdown: any) => {
      console.log('Idle stage 4');

      this.idleState = 'IDLE_TIME_IN_PROGRESS';
      this.progressBarPopup.componentInstance.count = (Math.floor((countdown - 1) / 60) + 1);
      this.progressBarPopup.componentInstance.progressCount = this.reverseNumber(countdown);
      this.progressBarPopup.componentInstance.countMinutes = (Math.floor(countdown / 60));
      this.progressBarPopup.componentInstance.countSeconds = countdown % 60;
    });

    // sets the ping interval to 15 seconds
    this.keepalive.interval(3);
    /**
     *  // Keepalive can ping request to an HTTP location to keep server session alive
     * keepalive.request('<String URL>' or HTTP Request);
     * // Keepalive ping response can be read using below option
     * keepalive.onPing.subscribe(response => {
     * // Redirect user to logout screen stating session is timeout out if if response.status != 200
     * });
     */

    // End : Session Timeout
  }

  // Start : Session Timeout Method
  reverseNumber(countdown: number) {
    return (300 - (countdown - 1));
  }

  reset() {
    console.log('Idle stage 5');
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  openProgressForm(count: number) {
    console.log('Idle stage 6');
    this.progressBarPopup = this.dialog.open(ProgressBarModelComponent, {
      backdropClass: 'static',
      disableClose: true
    });

    this.progressBarPopup.componentInstance.count = count;

    this.progressBarPopup.afterClosed.apply((result: any) => {
      console.log('Idle stage 7');
      if (result !== '' && 'logout' === result) {
        this.logout();
      } else {
        this.reset();
      }
    });
  }

  logout() {
    this.resetTimeOut();
  }

  closeProgressForm() {
    console.log('Idle stage 8');
    this.progressBarPopup.close();
  }

  resetTimeOut() {
    console.log('Idle stage 9');

    this.idle.stop();
    this.idle.onIdleStart.unsubscribe();
    this.idle.onTimeoutWarning.unsubscribe();
    this.idle.onIdleEnd.unsubscribe();
    this.idle.onIdleEnd.unsubscribe();
  }
  // End : Session Timeout Method

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {

        this.fuseConfig = config;

        // Boxed
        if (this.fuseConfig.layout.width === 'boxed') {
          this.document.body.classList.add('boxed');
        }
        else {
          this.document.body.classList.remove('boxed');
        }

        // Color theme - Use normal for loop for IE11 compatibility
        for (let i = 0; i < this.document.body.classList.length; i++) {
          const className = this.document.body.classList[i];

          if (className.startsWith('theme-')) {
            this.document.body.classList.remove(className);
          }
        }

        this.document.body.classList.add(this.fuseConfig.colorTheme);
      });

      // this.router.events.pipe(
      //   filter((event) => event instanceof NavigationEnd)
      // ).subscribe((event: NavigationEnd) => {
      //   this.previousUrl = this.currentUrl;
      //   this.currentUrl = event.url;
      //   this.urlService.setPreviousUrl(this.previousUrl);
      // });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  ngAfterViewInit() {    
    var userNavigations = this.authenticationService.getUserNavigations();

    if (userNavigations === undefined || userNavigations === null) {
      this.router.navigate(["../login"]);
      return;
    }

    // Get default navigation
    this.navigation = userNavigations;

    // Register the navigation to the service
    this._fuseNavigationService.register("main", this.navigation);

    // Set the main navigation as our current navigation
    this._fuseNavigationService.setCurrentNavigation("main");
  }
}
