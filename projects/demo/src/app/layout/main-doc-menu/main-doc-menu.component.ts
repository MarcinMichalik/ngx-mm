import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLinkWithHref} from '@angular/router';
import {RippleModule} from 'primeng/ripple';
import {StyleClassModule} from 'primeng/styleclass';

@Component({
  selector: 'app-main-doc-menu',
  standalone: true,
  imports: [CommonModule, RippleModule, StyleClassModule, RouterLinkWithHref],
  templateUrl: './main-doc-menu.component.html',
  styleUrls: ['./main-doc-menu.component.scss']
})
export class MainDocMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
