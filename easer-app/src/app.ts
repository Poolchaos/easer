import 'includes';
import 'app.scss';

import { autoinject, observable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules,
  validateTrigger,
  ValidateResult
} from 'aurelia-validation';

import { AppService } from './app-service';
import { SKILLS } from '_common/constants/skills';

@autoinject()
export class App {
  public skillList: any[] = SKILLS;

  @observable public name: '';
  @observable public phone: '';
  @observable public email: '';
  @observable public message: '';
  public validation: ValidationController;
  public submitted: boolean = false;
  public errors = { name: null, phone: null, email: null, message: null };

  constructor(
    private appService: AppService,
    private eventAggregator: EventAggregator,
    validationControllerFactory: ValidationControllerFactory
  ) {
    this.validation = validationControllerFactory.createForCurrentScope();
    this.validation.validateTrigger = validateTrigger.changeOrBlur;
  }

  public activate(): void {
    this.setupValidations();
  }

  private setupValidations(): void {
    ValidationRules
      .ensure('name')
      .required()
      .withMessage('Please enter your name.')
      .ensure('phone')
      .required()
      .withMessage('Please enter your contact number.')
      .ensure('email')
      .required()
      .withMessage('Please enter your email.')
      .then()
      .email()
      .withMessage('Please enter a valid email.')
      .ensure('message')
      .required()
      .withMessage('Please enter your message.')
      .on(this);
  }

  public clearError(errorName: string): void {
    this.errors[errorName] = null;
  }

  private resetErrors(): void {
    this.errors = { name: null, phone: null, email: null, message: null };
  }

  private setErrors(errors: ValidateResult[]): void {
    errors.forEach(error => {
      if (error.valid) return;

      switch(error.propertyName) {
        case 'name':
          this.errors.name = error.message;
          break;
        case 'phone':
          this.errors.phone = error.message;
          break;
        case 'email':
          this.errors.email = error.message;
          break;
        case 'message':
          this.errors.message = error.message;
          break;
        default:
          break;
      }
    });
  }

  public navigate(id: string): void {
    // let element = document.querySelector(`#${id}`);
    // element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    this.eventAggregator.publish('INDEX:SELECT', id);
  }

  public sendMessage(): void {
    this.resetErrors();
    this.submitted = true;

    this.validation
      .validate()
      .then(validation => {
        console.log(' ::>> validation ', validation);
        if (!validation.valid) {
          this.setErrors(validation.results);
          this.submitted = false;
          return;
        }
        console.log(' ::>> is valid ');
        this.appService
          .sendContactEmail(this.name, this.email, this.phone, this.message);
      });
  }

  public nameChanged(): void {
    this.clearError('name');
  }

  public phoneChanged(): void {
    this.clearError('phone');
  }

  public emailChanged(): void {
    this.clearError('email');
  }

  public messageChanged(): void {
    this.clearError('message');
  }
}
