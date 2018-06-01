import { Component, EventEmitter, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { fuseAnimations } from '../../../../../../../@fuse/animations';
import { FuseTranslationLoaderService } from '../../../../../../../@fuse/services/translation-loader.service';
import { Group } from '../group';
import { GroupDecoded } from '../group-decoded';

import { locale as english } from '../i18n/en';
import { SegmentConditionsConditionComponent } from '../segment-conditions-condition/segment-conditions-condition.component';

@Component({
  selector: 'app-segment-conditions-group',
  templateUrl: './segment-conditions-group.component.html',
  styleUrls: ['./segment-conditions-group.component.scss'],
  animations: fuseAnimations,
})
export class SegmentConditionsGroupComponent implements OnInit, OnDestroy {
  @ViewChildren('group') segmentConditionsGroupComponents: QueryList<SegmentConditionsGroupComponent>;
  @ViewChildren('condition') segmentConditionsConditionComponents: QueryList<SegmentConditionsConditionComponent>;
  @Input() public groupDecoded: GroupDecoded;

  private onCanSaveChangedSubscription: Subscription;

  public isGroup = Group.isGroup;

  constructor (private fuseTranslationLoader: FuseTranslationLoaderService) {
    this.fuseTranslationLoader.loadTranslations(english);
  }

  ngOnInit () {
    // this.onCanSaveChangedSubscription = this.canSave
    //   .subscribe((canSave) => {
    //     if (canSave === 'saving') {
    //       if (!this.groupDecoded.conditions.length) {
    //         this.canSave.emit('error');
    //       }
    //     } else {
    //       this.canSave.emit('ok');
    //     }
    //   });
  }

  public removeCondition (index: number): void {
    this.groupDecoded.conditions.splice(index, 1);
  }

  public prepareToSave (): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.groupDecoded.key) {
        reject('add group key');
      } else if (!this.groupDecoded.conditions.length) {
        reject('add condition');
      } else {
        this.segmentConditionsGroupComponents.forEach((segmentConditionsGroupComponent: SegmentConditionsGroupComponent) => {
          segmentConditionsGroupComponent.prepareToSave()
            .then(resolve)
            .catch(reject);
        });
        this.segmentConditionsConditionComponents.forEach((segmentConditionsConditionComponent: SegmentConditionsConditionComponent) => {
          segmentConditionsConditionComponent.prepareToSave()
            .then(resolve)
            .catch(reject);
        });
      }
    });
  }

  ngOnDestroy () {
    this.onCanSaveChangedSubscription.unsubscribe();
  }
}
