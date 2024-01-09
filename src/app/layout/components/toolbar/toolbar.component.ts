import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { CommonService } from 'app/services/common.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { navigation } from 'app/navigation/navigation';
import { AuthenticationService } from 'app/services/authentication.service';
import { UserModel } from 'app/models/user.model';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { environment } from 'environments/environment';
import {ActivatedRoute, Router } from '@angular/router';
import { RouteConstants } from 'app/constants/route.constant';
import { LoginModel } from 'app/models/login.model';
import { Platform } from '@angular/cdk/platform';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { BaseComponent } from 'app/common/base/base.component';
import { BaseService } from 'app/services/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToolbarService } from './toolbar.service';


@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, AfterViewInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    schoolId: string;
    selectedLanguage: any;
    userStatusOptions: any[];
    currentUser: UserModel;
    loginModel: LoginModel;
    isMobile: boolean;
    isCheckedIn: boolean = false;
  
    userLocation: { latitude: number, longitude: number } = null;


    public appInfo = environment;

    // Private
    private _unsubscribeAll: Subject<any>;
    showCheckInButton: boolean;
    // UserModel: any;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     * @param {Platform} _platform
     */
    constructor(public commonService: CommonService,
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private authenticationService: AuthenticationService,
        private fuseNavigationService: FuseNavigationService,
        private _platform: Platform,
        public router: Router,
        private dialogService: DialogService,
        public snackBar: MatSnackBar, 
        public routeParams: ActivatedRoute,
        public toolbarService: ToolbarService,
        
    ) {
        
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'gj',
                title: 'Gujarati',
                flag: 'gj'
            }
        ];

        //this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.currentUser = new UserModel();
        this.isMobile = false;
        this.isMobile = this._platform.ANDROID || this._platform.IOS;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.commonService.GetMasterDataByType({ DataType: 'SchoolsByUser', roleId: this.currentUser.RoleCode,ParentId:this.currentUser.UserTypeId, SelectTitle: "UserId" }).subscribe((response: any) => {
               console.log("userroel")
               console.log(response,"join me k")
              });
        // if (this.fusePerfectScrollbarDirective) {
        //     this.fusePerfectScrollbarDirective.isMobileChange.subscribe((isMobile: boolean) => {
        //         console.log('Is Mobile:', isMobile);
        //         // Use the isMobile value as needed
        //     });
        // }

        this.showCheckInButton = this._platform.ANDROID || this._platform.IOS;

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });
            
            // this.showCheckInButton = this._platform.ANDROID || this._platform.IOS;
            // console.log(this.showCheckInButton);
            // console.log("hsfe")
            
        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });
       
        var _currentUser = this.authenticationService.getCurrentUser();
        if (_currentUser != null) {
            this.currentUser = _currentUser;
        }

        var userNavigations = this.authenticationService.getUserNavigations();
        if (userNavigations != null) {
            this.navigation = userNavigations;
        }
       

        // Check screen width to detect tablet
        // if (window.innerWidth >= 600 && window.innerWidth < 1024) {
        //     console.log("It's a tablet");
        //     // You can set a flag or take some action for tablets
        // }
        
    }
    
    // checkIn(): void {
    //     console.log("checkins")
    //     this.isCheckedIn = !this.isCheckedIn;

    //     if (this.isCheckedIn) {
    //         // console.log("usernot")
    //         this.getUserLocation();
    //        console.log(this.currentUser.UserTypeId)

        //   this.commonService.GetMasterDataByType({ DataType: 'SchoolsByUser', roleId: this.currentUser.RoleCode,ParentId:this.currentUser.UserTypeId, SelectTitle: "UserId" }).subscribe((response: any) => {
        //    console.log("userroel")
        //    console.log(response)
        //   });



    //     }
    // }

    checkIn(): void {
        console.log("checkins");
        this.isCheckedIn = !this.isCheckedIn;
    
        if (this.isCheckedIn) {
            this.getUserLocation();
            this.commonService.GetMasterDataByType({
                DataType: 'SchoolsByUser',
                roleId: this.currentUser.RoleCode,
                ParentId: this.currentUser.UserTypeId,
                SelectTitle: "UserId"
            }).subscribe((response: any) => {
                this.schoolId = response.Results[1].Id;
                console.log(response.Results[1].Id, "idi");
    
                const userId = this.currentUser.UserTypeId;
                const latitude = this.userLocation.latitude;
                const longitude = this.userLocation.longitude;
                const schoolId = this.schoolId;
                const Designation = this.currentUser.Designation;
    
                this.toolbarService.saveUserLocation(userId, latitude, longitude, Designation)
                    .subscribe(
                        (response) => {
                            console.log("hello");
                            console.log('Location saved successfully:', response);
    
                            if (response && response.Result === 'Success') {
                                this.snackBar.open('Location saved successfully', 'OK', {
                                    duration: 3000,
                                });
                            } else {
                                this.dialogService.openShowDialog(response.Errors[0]);
                                console.log(response.Errors[0])
                                console.error('Unexpected response:', response);
                                this.snackBar.open('Failed to save location', 'OK', {
                                    duration: 3000,
                                    panelClass: ['error-snackbar'] 
                                });
                            }
                        },
                        (error) => {
                            console.error('Error saving user location:', error);
                            this.snackBar.open('Failed to save location', 'OK', {
                                duration: 3000,
                                panelClass: ['error-snackbar'] 
                            });
                        }
                    );
            });
        }
    }

    ngAfterViewInit() {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getUserLocation(): void {
        console.log("locationbaba")
       var UserId =this.currentUser.UserTypeId
        var errorMessages = "";
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    // errorMessages = "You have successfully Checked-In"
                    console.log('User Location:', this.userLocation);
                    // this.dialogService.openShowDialog(errorMessages);
                },
                (error) => {
                    errorMessages = "Please enable GPS for accurate location.";
                    this.dialogService.openShowDialog(errorMessages);
                    console.error('Error getting user location:', error);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
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

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    logout() {
        let logoutParam = {
            LoginUniqueId: this.currentUser.LoginUniqueId,
            AuthToken: this.currentUser.AuthToken
        };

        this.authenticationService.logoutUser(logoutParam).subscribe((logResp: any) => {
            // Logout current user and clear all resources
            this.authenticationService.logout();
        });
    }

    changePassword() {
        // Logout current user and clear all resources
        this.router.navigate([RouteConstants.Account.ChangePassword]);
    }
}
