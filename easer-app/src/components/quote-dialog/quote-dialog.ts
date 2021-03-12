import { autoinject, observable } from 'aurelia-framework';
import { DialogController } from "aurelia-dialog";
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules,
  validateTrigger,
  ValidateResult
} from 'aurelia-validation';

import './quote-dialog.scss';
import { AppService } from 'app-service';

@autoinject()
export class QuoteDialog {

  @observable public name: '';
  @observable public phone: '';
  @observable public email: '';
  @observable public service: 'Website';
  @observable public message: '';
  public validation: ValidationController;
  public submitted: boolean = false;
  public errors = { name: null, phone: null, email: null, message: null };

  constructor(
    private dialogController: DialogController,
    private appService: AppService,
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

  public sendQuoteRequest(): void {
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
        this.confirm();
      });
  }

  private confirm(): void {
    this.appService
      .sendContactEmail(
        this.name,
        this.phone,
        this.email,
        this.message,
        this.service
      )
      .then(() => {
        this.dialogController.ok();
        this.resetForm();
      })
      .catch(e => {
        console.log(' ::>> Failed to send email due to cause', e);
      })
      .finally(() => {
        this.submitted = false;
      });
  }

  private resetForm(): void {
    this.resetErrors();
    this.name = '';
    this.phone = '';
    this.email = '';
    this.message = '';
  }

  public cancel(): void {
    this.dialogController.cancel();
  }
}