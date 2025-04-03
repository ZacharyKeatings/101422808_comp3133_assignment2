import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN, SIGNUP } from '../graphql/queries';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';

  constructor(private apollo: Apollo) {}

  login(email: string, password: string) {
    return this.apollo.query<any>({
      query: LOGIN,
      variables: { email, password },
    }).pipe(map(result => {
      const token = result.data.login.token;
      localStorage.setItem(this.tokenKey, token);
      return result.data.login.user;
    }));
  }

  signup(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: SIGNUP,
      variables: { username, email, password },
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
