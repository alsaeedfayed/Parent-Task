import { Injectable } from '@angular/core';
import {jwtDecode , JwtPayload} from 'jwt-decode'; // Import the default function

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


 //decrypt token
 getDecodedAccessToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token); // Type assertion for clarity
  } catch (Error) {
    return null;
  }
}

}
