import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../../../../../@fuse/services/translation-loader.service';

import { locale as english } from '../../../segment-form/segment-conditions/i18n/en';

@Component({
  selector: 'app-segment-conditions-view-group',
  templateUrl: './segment-conditions-view-group.component.html',
  styleUrls: ['./segment-conditions-view-group.component.scss']
})
export class SegmentConditionsViewGroupComponent implements OnInit {
  @Input() public group;

  private groupKeys: string[] = ['$and', '$or'];
  private groupKeyNames: {
    [key: string]: string
  } = {
    '$and': 'AND',
    '$or': 'OR'
  };

  public groupKey = '$and';

  constructor (private fuseTranslationLoader: FuseTranslationLoaderService) {
    this.fuseTranslationLoader.loadTranslations(english);
  }

  ngOnInit () {
  }

  public getKey (group): string {
    for (let i = 0; i < this.groupKeys.length; i++) {
      if (group[this.groupKeys[i]]) {
        return this.groupKeys[i];
      }
    }

    return '';
  }

}
