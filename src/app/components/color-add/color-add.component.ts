import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;
  color: Color;
  colorId = -1;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.colorId = params['colorId'];
        this.getByColor();
      } else {
        this.createColorAddForm();
      }
    });
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.colorAddForm.valid) {
      //console.log(this.colorAddForm.value);
      let colorModel = Object.assign({}, this.colorAddForm.value);
      if (this.colorId === -1) {
        this.colorService.add(colorModel).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(() => {
              this.router.navigate(['/colors']);
            }, 2000);
          },
          (errorResponse) => {
            if (errorResponse.error.Errors.length > 0) {
              for (let i = 0; i < errorResponse.error.Errors.length; i++) {
                this.toastrService.error(
                  errorResponse.error.Errors[i].ErrorMessage,
                  'Doğrulama hatası'
                );
              }
            }
          }
        );
      } else {
        colorModel.id = Number(this.colorId);
        this.colorService.update(colorModel).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(() => {
              this.router.navigate(['/colors']);
            }, 2000);
          },
          (errorResponse) => {
            if (errorResponse.error.Errors.length > 0) {
              for (let i = 0; i < errorResponse.error.Errors.length; i++) {
                this.toastrService.error(
                  errorResponse.error.Errors[i].ErrorMessage,
                  'Doğrulama hatası'
                );
              }
            }
          }
        );
      }
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  getByColor() {
    this.colorService.getById(this.colorId).subscribe(
      (response) => {
        this.color = response.data;
        if (response.success) {
          this.colorAddForm = this.formBuilder.group({
            name: [this.color.name, Validators.required],
          });
        } else {
          this.createColorAddForm();
        }
      },
      (errorResponse) => {
        this.toastrService.error('Bir hata meydana geldi.', 'Dikkat');
      }
    );
  }
}
