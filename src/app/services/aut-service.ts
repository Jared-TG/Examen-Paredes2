import { computed, EnvironmentInjector, inject, Injectable, signal } from '@angular/core';
import { Login } from '../pages/login/login';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environment/environments';
import { J } from '@angular/cdk/keycodes';



export interface seccionUser{
    id : number,
    name : string,
    email : string
}

interface LoginResponse {
  token : string;
  message : string;
  user : seccionUser
}

@Injectable({
  providedIn: 'root',
})
export class AutService {
  private http = inject(HttpClient);

  private readonly storageKey = 'Seccion_User';
  private readonly  storageKeyToken = 'seccion_token';
  private readonly  LoginUrl = `${environment.apiurl}/auth/login`;


  private readonly _currentUser = signal <seccionUser | null>(this.readFromStorage());

  readonly isAuthenticated = computed(() => this._currentUser() !== null )

  readonly curretUser = computed(() => this._currentUser());

  Login(email: string, password: string) : Observable<seccionUser>  {
    return this.http.post<LoginResponse>(this.LoginUrl,{email, password}).pipe(
      tap((response) => {
        localStorage.setItem(this.storageKey,JSON.stringify(response.token));
        localStorage.setItem(this.storageKeyToken,response.token);
        this._currentUser.set(response.user);
      }),
      map((response) => response.user)
    );
  }

  readFromStorage() : seccionUser | null {
    const user = localStorage.getItem(this.storageKey);
    if (!user) return null;
    try {
    return JSON.parse(user) as seccionUser;

    }catch{
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }
  
  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem(this.storageKey);
  }
}
