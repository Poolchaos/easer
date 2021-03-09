

import 'includes';
import 'app.scss';

class Pager {
  public steps = [
    { label: 'Easer', active: null, enabled: true, activeSteps: ['Easer'] },
    { label: 'Applications', active: null, enabled: false, arrowImg: 'curly-dotted-arrow.png', activeSteps: ['Easer', 'Applications'] },
    { label: 'Components', active: null, enabled: false, arrowImg: 'curved-arrow-with-broken-line.png', activeSteps: ['Easer', 'Applications', 'Components'] },
    { label: 'Contact', active: null, enabled: false, arrowImg: 'rotated-right-arrow-with-broken-line.png', activeSteps: ['Easer', 'Applications', 'Components', 'Contact'] }
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

export class App {
  public pager = new Pager();
  public hasHover: boolean;

  public enable(): void {
    console.log(' ::>> enable ');
    this.hasHover = true;
  }

  public disable(): void {
    console.log(' ::>> disable ');
    this.hasHover = false;
  }
}
