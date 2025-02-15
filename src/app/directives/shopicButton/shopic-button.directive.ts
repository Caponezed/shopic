import { Directive, ElementRef, inject, OnInit } from '@angular/core';

@Directive({
  selector: '[appShopicButton]',
})
export class ShopicButtonDirective implements OnInit {
  host: ElementRef<HTMLElement> = inject(ElementRef);

  ngOnInit(): void {
    this.host.nativeElement.classList.add(
      'btn',
      'btn-primary',
      'w-100'
    )
  }
}


