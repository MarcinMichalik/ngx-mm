import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements AfterViewInit {

  @Input() lang = 'markup'
  @Input() style: any;
  @Input() styleClass: any;
  @ViewChild('code') codeViewChild!: ElementRef;

  constructor(public el: ElementRef) { }

  ngAfterViewInit(): void {
    const key: any = 'Prism';
    if(window[key]) {
      const prism: any = window[key];
      prism.highlightElement(this.codeViewChild.nativeElement);
    }
  }

}
