import { autoinject, customElement } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';

@autoinject()
@customElement('language-selector')
export class LanguageSelector {

  public locales: any;
  public currentLocale: any;

  constructor(private i18n: I18N) {
    this.locales = [{
      title: "English",
      code: "en"
    }, {
      title: "Afrikaans",
      code: "af"
    }];
    this.currentLocale = this.i18n.getLocale();
    console.log(' ::>> this.currentLocale >>>> ', this.currentLocale);
  }


  public setLocale(locale: { code: string }): void {
    let code = locale.code
    if(this.currentLocale !== code) {
      this.i18n.setLocale(code);
      this.currentLocale = code;
    }
  }
}