import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  apiUrl: string = environment.loginEndpoint;
  body: any = {
    user_name: '',
    user_pw: ''
  };

  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string) {
    this.body.user_name = username;
    this.body.user_pw = password;
    return this.http.post<any>(this.apiUrl + '/login', this.body).map( response => {
      sessionStorage.setItem('userID', response.data.userID);
      sessionStorage.setItem('loggedIn', 'true');
      return true;
    });
  }
}
