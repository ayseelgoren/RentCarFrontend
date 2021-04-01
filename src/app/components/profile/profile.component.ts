import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userId: number;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserInformation();
  }

  createProfileForm(user: User) {
    this.profileForm = this.formBuilder.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      email: [{ value: user.email, disabled: true }, Validators.required],
    });
  }

  update() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      let userModel = Object.assign({}, this.profileForm.value);
      this.user.firstName = userModel.firstName;
      this.user.lastName = userModel.lastName;
      this.userService.update(this.user).subscribe(
        (response) => {
          console.log(response);
          this.authService.signOut();
          this.toastrService.success(
            response.message + ' Tekrar giriş yapınız.'
          );
        },
        (error) => {
          console.log(error);
          this.toastrService.error(error.error);
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  getUserInformation() {
    this.userId = this.authService.getUserId();
    this.userService.getById(this.userId).subscribe(
      (response) => {
        console.log(response);
        this.user = response.data;

        this.createProfileForm(this.user);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
