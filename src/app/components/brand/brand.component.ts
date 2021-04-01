import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[];
  dataStatus: boolean = false;
  filterText = '';
  adminControlStatus = false;

  constructor(
    private brandService: BrandService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.adminControl();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      if (response.success) {
        this.dataStatus = true;
      }
    });
  }
  adminControl() {
    this.adminControlStatus = this.authService.adminControl();
  }
}
