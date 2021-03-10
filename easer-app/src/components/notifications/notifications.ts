import './notifications.scss';

export class Notifications {

  public notifications = [{
    message: 'COVID-19 Coronavirus notification: To access the South African Resource Portal, Click <a href="https://sacoronavirus.co.za/" target="_blank">Here</a>',
    enabled: true
  }];

  public close(item): void {
    item.enabled = false;
  }
}