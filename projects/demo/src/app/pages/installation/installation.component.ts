import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-installation',
    imports: [CommonModule],
    templateUrl: './installation.component.html',
    styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
