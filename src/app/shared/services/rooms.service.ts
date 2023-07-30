import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ResponseDelete } from '../interfaces/response-delete.interface';
import { Rooms } from '../interfaces/rooms/rooms.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private httpClient: HttpClient) {}

  apiUrl: string = environment.apiUrl;

  public getAllRooms(): Observable<Rooms[]> {
    return this.httpClient.get<Rooms[]>(`${this.apiUrl}/rooms`);
  }

  public deleteRoom(id: number): Observable<ResponseDelete> {
    return this.httpClient.delete<ResponseDelete>(`${this.apiUrl}/rooms/${id}`);
  }

}
