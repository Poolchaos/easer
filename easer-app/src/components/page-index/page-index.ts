import { customElement, bindable } from 'aurelia-framework';
import {bindingMode} from 'aurelia-binding';

import './page-index.scss';

class Pager {;

  public steps = [
    { label: 'Flaapworks', active: null, enabled: true, activeSteps: ['Flaapworks'] },
    { label: 'Solutions', active: null, enabled: false, arrowImg: 'curly-dotted-arrow.png', activeSteps: ['Flaapworks', 'Solutions'] },
    { label: 'Explore', active: null, enabled: false, arrowImg: 'curved-arrow-with-broken-line.png', activeSteps: ['Flaapworks', 'Solutions', 'Explore'] },
    { label: 'Get In Touch', active: null, enabled: false, arrowImg: 'rotated-right-arrow-with-broken-line.png', activeSteps: ['Flaapworks', 'Solutions', 'Explore', 'GetInTouch'] }
  ];

  public go(action: { label: string, activeSteps: string[] }): void {
    this.steps.forEach(step => {
      if(action.activeSteps.includes(step.label)) {
        step.active = true;
      } else {
        step.active = false;
      }
      step.enabled = action.label === step.label;
    });
    let element = document.querySelector(`#${action.label}`);
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

@customElement('page-index')
export class PageIndex {

  @bindable public active = 'Flaapworks'

  public pager = new Pager();

  private timeout = null;
  private ignoreScroll: boolean = false;

  public attached(): void {

    let easerObserver = new IntersectionObserver((entries) => this.handleIntersect(entries, 0));
    easerObserver.observe(document.querySelector('#Flaapworks'));
    
    let appObserver = new IntersectionObserver((entries) => this.handleIntersect(entries, 1));
    appObserver.observe(document.querySelector('#Solutions'));
    
    let compObserver = new IntersectionObserver((entries) => this.handleIntersect(entries, 2));
    compObserver.observe(document.querySelector('#Explore'));
    
    let contactObserver = new IntersectionObserver((entries) => this.handleIntersect(entries, 3));
    contactObserver.observe(document.querySelector('#GetInTouch'));
  }

  private handleIntersect(entries, step: number): void {
    const entry = entries[0];
    if (!this.ignoreScroll && entry.isIntersecting) {
      this.navTo(this.pager.steps[step], true);
    }
  }

  public navTo(step: any, ignoreTimeout?: boolean): void {

    if (!ignoreTimeout) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.ignoreScroll = true;
      this.timeout = setTimeout(() => {
        this.ignoreScroll = false;
      }, 1000);
    }
    
    this.pager.go(step);
    this.active = step.label;
  }
}