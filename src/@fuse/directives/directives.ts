import { NgModule } from '@angular/core';

import { FuseIfOnDomDirective } from '@fuse/directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import { FuseInnerScrollDirective } from '@fuse/directives/fuse-inner-scroll/fuse-inner-scroll.directive';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.directive';
import { DigitOnlyDirective } from './digit-only/digit-only.directive';
import { MaskDirective } from './digit-only/mask.directive';
import { AlphabatesOnlyDirective } from './digit-only/alphabates-only.directive';

@NgModule({
    declarations: [
        FuseIfOnDomDirective,
        FuseInnerScrollDirective,
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FusePerfectScrollbarDirective,
        DigitOnlyDirective,
        MaskDirective,
        AlphabatesOnlyDirective
    ],
    imports: [],
    exports: [
        FuseIfOnDomDirective,
        FuseInnerScrollDirective,
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FusePerfectScrollbarDirective,
        DigitOnlyDirective,
        MaskDirective,
        AlphabatesOnlyDirective
    ]
})
export class FuseDirectivesModule {
}
