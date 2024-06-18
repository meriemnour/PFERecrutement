import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/register-request.model';
import { BehaviorSubject, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl='http://localhost:8082/api/users';

  private loggedIn=new BehaviorSubject<boolean>(this.isTokenAvailable());
  constructor(private http:HttpClient,private router:Router) { }
  register(userDetails:RegisterRequest){
    return this.http.post<any>(`${this.apiUrl}/signup`,userDetails)
    .pipe(
      map(response=>{
        localStorage.setItem('access_token',response.accessToken);
        localStorage.setItem('refresh_token',response.refreshToken);
        localStorage.setItem('userId',response.id);
        this.loggedIn.next(true);
        return true;
      })
    )
  }
  login(email:string,motDePasse:string){
    return this.http.post<any>(`${this.apiUrl}/login`,{email,motDePasse})
    .pipe(
      map(response=>{
        localStorage.setItem('access_token',response.accessToken);
        localStorage.setItem('refresh_token',response.refreshToken);
        localStorage.setItem('userId',response.id);
        this.loggedIn.next(true);
        this.router.navigate(['/']);
        return true;
      })
    )
  }
  getUserById(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`)
  }
  getCurrentUser():Observable<any>{
    const userId=localStorage.getItem('userId');
    if(userId){
      const id=parseInt(userId);
      return this.getUserById(id);
    }
    else{
      return throwError('User ID not found in local storage');
    }
  }
  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userId');
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }
  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }
  isTokenAvailable():boolean{
    return !!localStorage.getItem('access_token');
  }
}
