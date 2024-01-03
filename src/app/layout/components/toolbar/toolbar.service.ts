import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from 'app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor(private http: BaseService) { }

  saveUserLocation(userId: number, latitude: number, longitude: number): Observable<any> {
    const url = 'your_backend_api_endpoint'; // Replace with your actual backend API endpoint

    const payload = {
      userId: userId,
      latitude: latitude,
      longitude: longitude
    };

    // Assuming you have a method in BaseService for making HTTP requests, adjust it accordingly
    return this.http.post(url, payload).pipe(
      catchError(error => {
        console.error('Error saving user location:', error);
        throw error;
      })
    );
  }
}
