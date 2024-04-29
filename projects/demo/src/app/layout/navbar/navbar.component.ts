import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BadgeModule} from 'primeng/badge';
import {RippleModule} from 'primeng/ripple';
import {StyleClassModule} from 'primeng/styleclass';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RippleModule, BadgeModule, StyleClassModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
