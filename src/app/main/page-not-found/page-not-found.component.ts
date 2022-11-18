import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class PageNotFoundComponent implements OnInit {

  constructor() {     
  }

  ngOnInit(): void {
  }

}
