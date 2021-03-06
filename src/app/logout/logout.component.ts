import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    window.localStorage.setItem('token', '')
    this.router.navigate(['/login']);
  }

}
