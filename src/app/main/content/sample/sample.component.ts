import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';

@Component({
  selector: 'fuse-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class FuseSampleComponent {
  constructor (private fuseTranslationLoader: FuseTranslationLoaderService) {
    this.fuseTranslationLoader.loadTranslations(english);
  }
}
