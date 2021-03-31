import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingularResponseModel } from '../models/singularResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomerService } from './customer.service';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44362/api/auth/';
  jwtHelper: JwtHelperService = new JwtHelperService();

  userName: string;
  userId: number;

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  login(loginModel: LoginModel) {
    this.httpClient
      .post<SingularResponseModel<TokenModel>>(
        this.apiUrl + 'login',
        loginModel
      )
      .subscribe(
        (response) => {
          if (response.success) {
            this.toastrService.success('Giriş başarılı.', 'Başarılı');
            this.localStorageService.setItem('token', response.data.token);
            setTimeout(() => {
              location.reload();
            }, 500);
          }
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Dikkat');
        }
      );
  }

  register(registerModel: RegisterModel) {
    return this.httpClient.post<SingularResponseModel<TokenModel>>(
      this.apiUrl + 'register',
      registerModel
    );
  }

  signOut() {
    this.localStorageService.removeItem('token');
    this.toastrService.success('Çıkış yapıldı', 'Başarılı');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 400);
  }

  isAuthenticated() {
    if (
      !this.jwtHelper.isTokenExpired(this.localStorageService.getItem('token'))
    ) {
      return true;
    } else {
      return false;
    }
  }

  adminControl() {
    var decoded = this.getDecodedToken();
    var propAdminControl = Object.keys(decoded).filter((x) =>
      x.endsWith('/role')
    )[0];
    if (decoded[propAdminControl] === 'Admin') {
      return true;
    } else {
      return false;
    }
  }

  getDecodedToken() {
    try {
      return this.jwtHelper.decodeToken(
        this.localStorageService.getItem('token')
      );
    } catch (Error) {
      return null;
    }
  }

  getUserName() {
    var decoded = this.getDecodedToken();
    if (decoded) {
      var propUserName = Object.keys(decoded).filter((x) =>
        x.endsWith('/name')
      )[0];
      this.userName = decoded[propUserName];
      return this.userName;
    } else {
      return null;
    }
  }

  getUserId() {
    var decoded = this.getDecodedToken();
    if (decoded) {
      var propUserId = Object.keys(decoded).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      this.userId = Number(decoded[propUserId]);
      return this.userId;
    } else {
      return null;
    }
  }
}
