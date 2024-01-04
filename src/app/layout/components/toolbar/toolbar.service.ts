import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor(private http: BaseService) { }

  saveUserLocation(userId: number, latitude: number, longitude: number): Observable<any> {
    const url = 'LighthouseServices/Toolbar/CreateToolbar';

    const payload = {
      UserId: userId,
      Latitude: latitude,
      Longitude: longitude
    };

    return this.http.post(url, payload).pipe(
      catchError(error => {
        console.error('Error saving user location:', error);
        throw error;
      })
    );
  }
}
