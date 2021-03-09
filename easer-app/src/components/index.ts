import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export function configure(config: FrameworkConfiguration): void {
  config.globalResources([
    PLATFORM.moduleName('./language-selector/language-selector'),
    PLATFORM.moduleName('./page-index/page-index'),
  ]);
}
