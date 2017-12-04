import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public currentHref = '';

  constructor() { }

  /**
   * Check current route and element route
   * and set active class.
   * @param ele the current selected element
   */
  checkCurrentRoute(ele) {
    if (ele._elementRef.nativeElement.href === window.location.href) {
      return true;
    }
    return false;
  }
}
