import { customElement, bindable } from 'aurelia-framework';
import {bindingMode} from 'aurelia-binding';

import './page-index.scss';

class Pager {;

  public steps = [
    { label: 'Easer', active: null, enabled: true, activeSteps: ['Easer'] },
    { label: 'Projects', active: null, enabled: false, arrowImg: 'curly-dotted-arrow.png', activeSteps: ['Easer', 'Projects'] },
    { label: 'Components', active: null, enabled: false, arrowImg: 'curved-arrow-with-broken-line.png', activeSteps: ['Easer', 'Projects', 'Components'] },
    { label: 'Contact', active: null, enabled: false, arrowImg: 'rotated-right-arrow-with-broken-line.png', activeSteps: ['Easer', 'Projects', 'Components', 'Contact'] }
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

  @bindable public active = 'Easer'

  public pager = new Pager();

  private timeout = null;
  private ignoreScroll: boolean = false;

  public attached(): void {

    let easerObserver = new IntersectionObserver((entries) => this.handleIntersect(entries[0], 0));
    easerObserver.observe(document.querySelector('#Easer'));
    
    let appObserver = new IntersectionObserver((entries) => this.handleIntersect(entries[0], 1));
    appObserver.observe(document.querySelector('#Projects'));
    
    let compObserver = new IntersectionObserver((entries) => this.handleIntersect(entries[0], 2));
    compObserver.observe(document.querySelector('#Components'));
    
    let contactObserver = new IntersectionObserver((entries) => this.handleIntersect(entries[0], 3));
    contactObserver.observe(document.querySelector('#Contact'));
  }

  private handleIntersect(entry, step: number): void {
    if (!this.ignoreScroll && entry.isIntersecting)
    this.navTo(this.pager.steps[step], 50);
  }

  public navTo(step: any, time?: number): void {
    this.ignoreScroll = true;
    this.pager.go(step);
    this.active = step.label;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.ignoreScroll = false;
    }, time || 1000)
  }
}