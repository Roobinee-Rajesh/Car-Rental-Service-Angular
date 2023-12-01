import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchRange } from 'src/app/model/searchRange';
import { AppResponse } from 'src/app/model/appResponse';
import { urlEndpoint } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class UserFindCarService {
  constructor(private http: HttpClient) {}

  findCars(searchRange: SearchRange): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/car/allAvailableCars/${searchRange.start_date}/${searchRange.end_date}`
    );
  }

  findCarById(carId: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/car/carById/${carId}`
    );
  }
}
