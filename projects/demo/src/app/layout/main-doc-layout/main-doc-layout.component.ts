import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MainDocMenuComponent} from '../main-doc-menu/main-doc-menu.component';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-main-doc-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, MainDocMenuComponent],
  templateUrl: './main-doc-layout.component.html',
  styleUrls: ['./main-doc-layout.component.scss']
})
export class MainDocLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
