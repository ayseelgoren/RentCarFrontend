import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;
  brandId = -1;
  brand: Brand;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.brandId = params['brandId'];
        this.getByBrand();
      } else {
        this.createBrandAddForm();
      }
    });
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.brandAddForm.valid) {
      console.log(this.brandAddForm.value);
      let brandModel = Object.assign({}, this.brandAddForm.value);
      if (this.brandId === -1) {
        this.brandService.add(brandModel).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(() => {
              this.router.navigate(['/brands']);
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
        brandModel.id = Number(this.brandId);
        this.brandService.update(brandModel).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(() => {
              this.router.navigate(['/brands']);
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

  getByBrand() {
    this.brandService.getById(this.brandId).subscribe(
      (response) => {
        this.brand = response.data;
        if (response.success) {
          this.brandAddForm = this.formBuilder.group({
            name: [this.brand.name, Validators.required],
          });
        } else {
          this.createBrandAddForm();
        }
      },
      (errorResponse) => {
        this.toastrService.error('Bir hata meydana geldi.', 'Dikkat');
      }
    );
  }
}
