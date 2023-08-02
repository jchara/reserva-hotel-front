import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ResponseDelete } from '../interfaces/response-delete.interface';
import { Room } from '../interfaces/rooms/rooms.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private httpClient: HttpClient) {}

  apiUrl: string = environment.apiUrl;

  public createRoom(room: Room): Observable<Room> {
    return this.httpClient.post<Room>(`${this.apiUrl}/rooms`, room);
  }

  public getRoomById(id: number): Observable<Room> {
    return this.httpClient.get<Room>(`${this.apiUrl}/rooms/${id}`);
  }

  public getAllRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(`${this.apiUrl}/rooms`);
  }

  public deleteRoom(id: number): Observable<ResponseDelete> {
    return this.httpClient.delete<ResponseDelete>(`${this.apiUrl}/rooms/${id}`);
  }

  public updateRoom(id: number, room: Room): Observable<Room> {
    return this.httpClient.put<Room>(`${this.apiUrl}/rooms/${id}`, room);
  }
  

}
