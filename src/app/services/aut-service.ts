import { computed, Injectable, signal } from '@angular/core';
import { Login } from '../pages/login/login';

export interface seccionUser{
    id : number,
    name : string,
    email : string
}


@Injectable({
  providedIn: 'root',
})
export class AutService {
  mockUser: any[] = [
    { id: 1, name: 'John Doe', email: 'Jahn@generico.com', password: '123456' },
    { id: 2, name: 'Jane Doe', email: 'Jane@generico.com', password: '123456' }
  ]

  private readonly storageKey = 'Seccion_User';


  private readonly _currentUser = signal <seccionUser | null>(this.readFromStorage());

  readonly isAuthenticated = computed(() => this._currentUser() !== null )

  readonly curretUser = computed(() => this._currentUser());

  Login(email: string, password: string) : boolean {
    const exist = this.mockUser.find(
      u =>
        u.email.toLowerCase() === email.toLowerCase().trim() &&
        u.password.toLowerCase() === password.toLowerCase().trim()
    );
    if (!exist) return false;
    
    const seccionUser : seccionUser = { 
      id : exist.id,
      name : exist.name,
      email : exist.email
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify(seccionUser));

    this._currentUser.set(seccionUser);
    return true;
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
