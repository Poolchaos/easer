import { customElement, autoinject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

import './page-index.scss';

class Pager {;

  public steps = [
    { id: 'Flaapworks', label: 'Flaapworks', active: null, enabled: true, activeSteps: ['Flaapworks'] },
    { id: 'Services', label: 'Services', active: null, enabled: false, arrowImg: 'curly-dotted-arrow.png', activeSteps: ['Flaapworks', 'Services'] },
    { id: 'Explore', label: 'Explore', active: null, enabled: false, arrowImg: 'curved-arrow-with-broken-line.png', activeSteps: ['Flaapworks', 'Services', 'Explore'] },
    { id: 'About', label: 'About', active: null, enabled: false, arrowImg: 'up-broken-line-arrow.png', activeSteps: ['Flaapworks', 'Services', 'Explore', 'About'] },
    { id: 'GetInTouch', label: 'Get In Touch', active: null, enabled: false, arrowImg: 'rotated-right-arrow-with-broken-line.png', activeSteps: ['Flaapworks', 'Services', 'Explore', 'About', 'GetInTouch'] }
  ];

  public go(action: { id: string, activeSteps: string[] }): void {
    this.steps.forEach(step => {
      if(action.activeSteps.includes(step.id)) {
        step.active = true;
      } else {
        step.active = false;
      }
      step.enabled = action.id === step.id;
    });
    let element = document.querySelector(`#${action.id}`);
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

@autoinject()
@customElement('page-index')
export class PageIndex {

  @bindable public active = 'Flaapworks'

  public pager = new Pager();

  private timeout = null;
  private ignoreScroll: boolean = false;

  constructor(private eventAggregator: EventAggregator) {}

  public bind(): void {
    this.eventAggregator.subscribe('INDEX:SELECT', (id: string) => {
      let step = this.pager.steps.find(step => step.id === id);
      if (step) {
        this.navTo(step);
      }
    });
  }

  public attached(): void {

    let easerObserver = new IntersectionObserver((entries) => this.handleIntersect(entries, 0));
    easerObserver.observe(document.querySelector('#Flaapworks'));
    
    let appObserver = new IntersectionObserver((entries) => this.handleIntersect(entries, 1));
    appObserver.observe(document.querySelector('#Services'));
    
    let compObserver = new IntersectionObserver((entries) => this.handleIntersect(entries, 2));
    compObserver.observe(document.querySelector('#Explore'));
    
    let aboutObserver = new IntersectionObserver((entries) => this.handleIntersect(entries, 3));
    aboutObserver.observe(document.querySelector('#About'));
    
    let contactObserver = new IntersectionObserver((entries) => this.handleIntersect(entries, 4));
    contactObserver.observe(document.querySelector('#GetInTouch'));
  }

  private handleIntersect(entries: IntersectionObserverEntry[], step: number): void {
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