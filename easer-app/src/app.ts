import 'includes';
import 'app.scss';

import { autoinject } from 'aurelia-framework';

import { AppService } from 'app-service';

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
  public contact = { name: '', phone: '', email: '', message: '' };

  constructor(private appService: AppService) {}

  public navigate(id: string): void {
    let element = document.querySelector(`#${id}`);
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  public sendMessage(): void {

    const name = this.contact.name;
    const email = this.contact.email;
    const phone = this.contact.phone;
    const message = this.contact.message;

    this.appService
      .sendContactEmail(name, email, phone, message);
  }
}
