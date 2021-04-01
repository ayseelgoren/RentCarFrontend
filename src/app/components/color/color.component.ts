import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { AuthService } from 'src/app/services/auth.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[];
  dataStatus: boolean = false;
  filterText = '';
  adminControlStatus = false;

  constructor(
    private colorService: ColorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.adminControl();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      if (response.success) {
        this.dataStatus = true;
      }
    });
  }
  adminControl() {
    this.adminControlStatus = this.authService.adminControl();
  }
}
