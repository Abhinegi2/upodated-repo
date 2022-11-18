import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LoginModel } from 'app/models/login.model';
import { AppConstants } from 'app/app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';

@Component({
  providers: [AppConstants],
  selector: 'igmite-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class HomeComponent extends BaseComponent<LoginModel> implements OnInit {
  public appInfo = environment;
  public slides = [
    { 'image': 'assets/images/sliderImages/1.jpg' },
    { 'image': 'assets/images/sliderImages/2.jpg' },
    { 'image': 'assets/images/sliderImages/3.jpg' },
    { 'image': 'assets/images/sliderImages/4.jpg' },
    { 'image': 'assets/images/sliderImages/5.jpg' },
    { 'image': 'assets/images/sliderImages/6.jpg' },
    { 'image': 'assets/images/sliderImages/7.jpg' }    
  ];

  constructor(
    public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private fuseConfigService: FuseConfigService,
    public formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Configure the Login layout
    this.fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  ngOnInit(): void {
  }
}
