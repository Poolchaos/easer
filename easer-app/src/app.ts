import 'includes';
import 'app.scss';

import{ init } from 'emailjs-com';
init("user_HB0sidICvn4VKjVvChK57");

import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';

@autoinject()
export class App {
  public skillList: any[] = [
    { img: 'aurelia.png', label: 'Aurelia' },
    { img: 'angular.webp', label: 'Angular' },
    { img: 'aws.png', label: 'AWS' },
    { img: 'css3.webp', label: 'CSS3' },
    { img: 'docker.png', label: 'Docker' },
    { img: 'electron.png', label: 'Electron' },
    { img: 'expressjs.svg', label: 'ExpressJS' },
    { img: 'git.png', label: 'Git' },
    { img: 'gulp.png', label: 'Gulp' },
    { img: 'html5.png', label: 'HTML5' },
    { img: 'javascript.png', label: 'JavaScript' },
    { img: 'jenkins.jpg', label: 'Jenkins' },
    { img: 'jwt.png', label: 'JSON Web Tokens' },
    { img: 'kubernetes.png', label: 'Kubernetes' },
    { img: 'mongodb.png', label: 'Mongo DB' },
    { img: 'nodejs.png', label: 'NodeJS' },
    { img: 'rabbitmq.png', label: 'RabbitMQ' },
    { img: 'react.png', label: 'React' },
    { img: 'redux.png', label: 'Redux' },
    { img: 'rxjs.png', label: 'RxJS' },
    { img: 'typescript.png', label: 'TypeScript' },
    { img: 'vue-js.png', label: 'VueJS' },
    { img: 'webpack.png', label: 'Webpack' },
    { img: 'webrtc.png', label: 'Webrtc' },
    { img: 'wordpress.png', label: 'Wordpress' }
  ];
  public contact = {
    name: '',
    phone: '',
    email: '',
    message: ''
  };

  constructor(private httpClient: HttpClient) {}

  public navigate(id: string): void {
    let element = document.querySelector(`#${id}`);
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  public sendMessage(): void {
    this.httpClient
      .createRequest('https://api.emailjs.com/api/v1.0/email/send')
      .asPost()
      .withContent({
        user_id: 'user_HB0sidICvn4VKjVvChK57',
        service_id: 'service_d6die1r',
        template_id: 'template_8ld8gcv',
        template_params: this.contact
      })
      .withHeader('Content-Type', 'application/json')
      .send()
      .catch(e => {
        console.error(' ::>> failed to send email ', e);
      });
  }
}
