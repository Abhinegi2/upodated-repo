import { Component } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
    selector   : 'footer',
    templateUrl: './footer.component.html',
    styleUrls  : ['./footer.component.scss']
})
export class FooterComponent
{
    public appInfo = environment;
    
    constructor()
    {
    }
}
