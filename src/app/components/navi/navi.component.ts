import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { AuthService } from 'src/app/services/auth.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  colors: Color[] = [];
  currentColor: Color = { id: 0, name: '' };
  ifLoggedIn = false;
  userName: string;
  adminControlStatus = false;

  constructor(
    private colorService: ColorService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getColors();

    this.ifLoggedIn = this.authService.isAuthenticated();
    if (this.ifLoggedIn === true) {
      this.userName = this.authService.getUserName();
      this.adminControl();
    } else {
      this.authService.signOut();
    }
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  signOut() {
    this.authService.signOut();
  }

  adminControl() {
    this.adminControlStatus = this.authService.adminControl();
  }
}
