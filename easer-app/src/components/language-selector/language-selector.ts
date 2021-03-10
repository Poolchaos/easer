import { autoinject, customElement, containerless } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';

import './language-selector.scss';

@containerless()
@autoinject()
@customElement('language-selector')
export class LanguageSelector {

  public locales: any;
  public currentLocale: any;
  public selectedLocale: any;
  public visible: boolean;

  constructor(private i18n: I18N) {
    this.locales = [{
      title: "English",
      code: "en"
    }, {
      title: "Afrikaans",
      code: "af"
    }];
    this.currentLocale = this.i18n.getLocale();
    this.selectedLocale = this.locales.find(loc => loc.code === this.currentLocale).title;
    console.log(' ::>> this.currentLocale >>>> ', this.currentLocale);
  }


  public setLocale(locale: { title: string, code: string }): void {
    let code = locale.code
    if(this.currentLocale !== code) {
      this.i18n.setLocale(code);
      this.currentLocale = code;
      this.selectedLocale = locale.title;
    }
    this.hide();
  }

  public toggle(): void {
    this.visible = !this.visible;
  }

  public hide(): void {
    this.visible = false;
  }
}