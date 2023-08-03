import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, UserID } from '../interfaces/users/users.interface';
import { Observable } from 'rxjs';
import { ResponseDelete } from '../interfaces/response-delete.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`);
  }

  public getUserById(id: UserID): Observable<User> {
    return this.httpClient.get<User>(
      `${this.apiUrl}/users/${id.documentType}/${id.documentNumber}`
    );
  }

  public createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/users`, user);
  }

  public updateUser(id: UserID, user: User): Observable<User> {
    return this.httpClient.put<User>(
      `${this.apiUrl}/users/${id.documentType}/${id.documentNumber}`,
      user
    );
  }

  public deleteUser(id: UserID): Observable<ResponseDelete> {
    return this.httpClient.delete<ResponseDelete>(
      `${this.apiUrl}/users/${id.documentType}/${id.documentNumber}`
    );
  }
}
