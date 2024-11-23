import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    // DONE: return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    // DONE: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string): boolean {
    // DONE: implement token expiration check logic
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (decodedToken.exp) {
      const expirationDate = new Date(decodedToken.exp * 1000);
      return expirationDate < new Date();
    }
    return true;
  }

  getToken(): string {
    // DONE: return the token
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    // DONE: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // DONE: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // DONE: remove the token from localStorage
    localStorage.removeItem('id_token');
    // DONE: redirect to the login page
    window.location.assign('/');
  }
}

export default new AuthService();
