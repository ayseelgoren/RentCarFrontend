import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  //Kullanıcı user olarak eklerken müşteri olarak da ekliyoruz
  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe(
        (response) => {
          if (response.success) {
            this.userService.addUserAsCustomer().subscribe(
              (response) => {
                console.log(response);
              },
              (error) => {
                console.log(error);
              }
            );
            this.toastrService.success(
              'Kayıt olundu giriş sayfasına yönlendirileceksin.Lütfen bekleyiniz.',
              'Başarılı'
            );

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          }
        },
        (errorResponse) => {
          //console.log(errorResponse);
          this.toastrService.error(errorResponse.error, 'Doğrulama hatası');
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
}
