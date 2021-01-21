import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  search(username) {
    return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
      debounceTime(1500),
      distinctUntilChanged(),
      map((response: User[]) => {
        return response
          .filter((user) =>
            user.name.toUpperCase().startsWith(username.toUpperCase())
          )
          .map((user, index) => {
            return { ...user, id: ++index };
          });
      })
    );
  }
}
