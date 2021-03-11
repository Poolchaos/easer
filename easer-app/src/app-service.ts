import{ init } from 'emailjs-com';
init("user_HB0sidICvn4VKjVvChK57");

import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';

@autoinject()
export class AppService {

  constructor(private httpClient: HttpClient) {}

  public sendContactEmail(name: string, phone: string, email: string, message: string): void {
    this.httpClient
      .createRequest('https://api.emailjs.com/api/v1.0/email/send')
      .asPost()
      .withContent({
        user_id: 'user_HB0sidICvn4VKjVvChK57',
        service_id: 'service_d6die1r',
        template_id: 'template_8ld8gcv',
        template_params: {
          name,
          phone,
          email,
          message
        }
      })
      .withHeader('Content-Type', 'application/json')
      .send()
      .catch(e => {
        console.error(' ::>> failed to send email ', e);
      });
    }
}