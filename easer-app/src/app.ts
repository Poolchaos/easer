import 'includes';
import 'app.scss';

import { autoinject, observable } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DialogService } from 'aurelia-dialog';
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
  public sent: boolean = false;

  constructor(
    private appService: AppService,
    private eventAggregator: EventAggregator,
    private dialogService: DialogService,
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

  private resetForm(): void {
    this.resetErrors();
    this.name = '';
    this.phone = '';
    this.email = '';
    this.message = '';
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
    this.eventAggregator.publish('INDEX:SELECT', id);
  }

  public getQuote(service: string): void {
    console.log(' get a quote for ', service);
    // todo: implement this
    this.dialogService
      .open({ viewModel: PLATFORM.moduleName('components/quote-dialog/quote-dialog'), model: {} })
      .then(dialog => {
        if (dialog.wasCancelled) {
          return;
        }
      });
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
          .sendContactEmail(
            this.name,
            this.phone,
            this.email,
            this.message
          )
          .then(() => {
            this.messageSent();
            this.resetForm()
          })
          .catch(e => {
            console.log(' ::>> Failed to send email due to cause', e);
          })
          .finally(() => {
            this.submitted = false;
          });
      });
  }

  private messageSent(): void {
    this.sent = true;
    setTimeout(() => {
      this.sent = false;
    }, 3000);
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
