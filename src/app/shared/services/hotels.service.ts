import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from '../../../environments/environment';
import { Hotel } from '../interfaces/hotels/hotels.interface';
import { ResponseDelete } from '../interfaces/response-delete.interface';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public createHotel(hotel: Hotel): Observable<Hotel> {
    return this.httpClient.post<Hotel>(`${this.apiUrl}/hotels`, hotel);
  }

  public getHotelById(id: number): Observable<Hotel> {
    return this.httpClient.get<Hotel>(`${this.apiUrl}/hotels/${id}`);
  }

  public getAllHotels(): Observable<Hotel[]> {
    return this.httpClient.get<Hotel[]>(`${this.apiUrl}/hotels`);
  }

  public deleteHotel(id: number): Observable<ResponseDelete> {
    return this.httpClient.delete<ResponseDelete>(
      `${this.apiUrl}/hotels/${id}`
    );
  }

  public updateHotel(id: number, hotel: Hotel): Observable<Hotel> {
    return this.httpClient.put<Hotel>(`${this.apiUrl}/hotels/${id}`, hotel);
  }
}
