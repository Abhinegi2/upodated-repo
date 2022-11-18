import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from './loader.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'igmite-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LoaderComponent implements OnInit {

  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  isLoading: boolean;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((isRunningLoader) => {
      this.isLoading = isRunningLoader;
    });
  }

  ngOnInit(): void {
  }
}
