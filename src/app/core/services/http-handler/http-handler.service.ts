import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { NotificationsService } from '../notifications/notifications.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class HttpService   {

  constructor(private http: HttpClient , private notificationService : NotificationsService) { }



  get<T>(url: string, params?: any, headers?: HttpHeaders): Observable<T | T[]> {
    const options = {
      params: new HttpParams({ fromObject: params }),
      headers: headers ? headers : new HttpHeaders()
    }
    return this.http.get<T | T[]>(this.getURL(url), options).pipe(
      catchError(
        (error) : Observable<any> => {
          return this.handleError(error)
         // return of(1,2,3)
        }


      )
    );
  }

  post<T>(url: string, body: T, params?: any, headers?: HttpHeaders): Observable<T> {
    const options = {
      params: new HttpParams({ fromObject: params }),
      headers: headers ? headers : new HttpHeaders()
    }
    return this.http.post<T>(this.getURL(url), body, options).pipe(
      catchError(this.handleError)
    );
  }


  put<T>(url: string, body: T, params?: any, headers?: HttpHeaders): Observable<T> {
    const options = {
      params: new HttpParams({ fromObject: params }),
      headers: headers ? headers : new HttpHeaders()
    }
    return this.http.post<T>(this.getURL(url), body, options).pipe(
      catchError(this.handleError)
    );
  }


  patch<T>(url: string, body: T, params?: any, headers?: HttpHeaders): Observable<T> {
    const options = {
      params: new HttpParams({ fromObject: params }),
      headers: headers ? headers : new HttpHeaders()
    }
    return this.http.post<T>(this.getURL(url), body, options).pipe(
      catchError(this.handleError)
    );
  }



  delete<T>(url: string, params?: any, headers?: HttpHeaders): Observable<T> {
    const options = {
      params: new HttpParams({ fromObject: params }),
      headers: headers ? headers : new HttpHeaders()
    }
    return this.http.get<T>(this.getURL(url), options).pipe(
      catchError(this.handleError)
    );
  }


  //Get the url
  private getURL(path: string): string {
    //pass the entire path from the param or use the base in the env and put the rest of the path.
    if (path && (path.includes('http://') || path.includes('https://'))) return path
    return environment.serverUrl + path
  }


   //Handle errors funciton
   private handleError(error : HttpErrorResponse){
    let errorMsg = "An error occurred: ";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMsg = 'An error occurred:', error.error.message;

    } else {
      // The backend returned an unsuccessful response code.
        errorMsg = `Backend returned code ${error.message}`
    }
    // this.createBasicNotificationn('error' , errorMsg)
     this.notificationService.createBasicNotification('error' , 'Error' , errorMsg)
    // return an observable with a user-facing error message
    return throwError( errorMsg)
  }

}


