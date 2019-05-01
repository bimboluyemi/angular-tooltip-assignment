import { Component, AfterViewInit, Input, HostListener, OnInit, ViewChild, ElementRef, Inject } from '@angular/core'
import { TooltipContainerDirective } from './tooltipContainerDirective';

@Component({
    templateUrl: './tooltipComponent.html'
})
export class TooltipComponent implements OnInit{

    top : string;
  @ViewChild(TooltipContainerDirective, { read: ElementRef }) private tooltipContainer;

  constructor( @Inject('tooltipConfig') private config ) {
  }

  ngOnInit() {
    // For simplicity, we calculate only the top.
    const { top } = this.config.host.getBoundingClientRect();
    const { height } = this.tooltipContainer.nativeElement.getBoundingClientRect();
    this.top = `${top - height}px`;
  }


}