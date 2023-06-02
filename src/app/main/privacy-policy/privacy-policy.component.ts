import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';


@Component({
  selector: 'privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PrivacyPolicyComponent implements OnInit {

  constructor(
    private fuseConfigService: FuseConfigService,
  ) { 
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
