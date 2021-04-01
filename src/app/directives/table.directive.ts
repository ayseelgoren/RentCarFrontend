import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTable]'
})
export class TableDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.setBgColor('white')
  }

  setBgColor(color: string) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      color
    )
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBgColor('gray')
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.setBgColor('white')
  }
 
}
