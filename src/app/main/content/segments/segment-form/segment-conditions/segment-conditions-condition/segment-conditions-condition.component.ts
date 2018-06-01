import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FuseTranslationLoaderService } from '../../../../../../../@fuse/services/translation-loader.service';
import { Country } from '../../../../../../global/models/country';
import { GlobalService } from '../../../../../../global/services/global.service';
import { Operator } from '../../../operator';
import { SegmentsService } from '../../../segments.service';
import { Selector } from '../../../selector';
import { Condition } from '../condition';

import { locale as english } from '../i18n/en';
import { SegmentConditionsGroupComponent } from '../segment-conditions-group/segment-conditions-group.component';

@Component({
  selector: 'app-segment-conditions-condition',
  templateUrl: './segment-conditions-condition.component.html',
  styleUrls: ['./segment-conditions-condition.component.scss'],
})
export class SegmentConditionsConditionComponent implements OnInit, OnDestroy {
  @Input() public condition: Condition;
  @Output() private remove: EventEmitter<any> = new EventEmitter();

  public getType = Condition.getType;
  public getOperatorType = Selector.getOperatorType;

  private onSelectorsAndOperatorsChangedSubscription: Subscription;

  public selectors: Selector[];
  public selectorsFiltered: Selector[];
  public operators: Operator[];
  private includeExcludeOperators: Operator[];
  private compareOperators: Operator[];
  private newUserOperators: Operator[];
  private mapOperators: Operator[];
  public countries: Country[];

  public values: any[] = [];
  public emptyData: any[] = [];

  constructor (private fuseTranslationLoader: FuseTranslationLoaderService,
               private globalService: GlobalService,
               private segmentsService: SegmentsService) {
    this.fuseTranslationLoader.loadTranslations(english);

  }

  ngOnInit () {
    this.onSelectorsAndOperatorsChangedSubscription = this.segmentsService.onSelectorsAndOperatorsChanged
      .subscribe(([selectors, includeExcludeOperators, compareOperators, newUserOperators, mapOperators]: [Selector[], Operator[], Operator[], Operator[], Operator[]]) => {
        if (selectors) {
          this.selectors = selectors;
          this.selectorsFiltered = Selector.filterByType(Condition.getType(this.condition.fieldName).types, this.selectors);
          this.includeExcludeOperators = includeExcludeOperators;
          this.compareOperators = compareOperators;
          this.newUserOperators = newUserOperators;
          this.mapOperators = mapOperators;

          this.setOperators(this.selectors.filter((selector: Selector) => selector.name === this.condition.fieldName)[0].operatorType);
        }
      });

    this.globalService.onCountriesChanged
      .subscribe((countries: Country[]) => {
        this.countries = countries;
      });
  }

  public onSelectorSelect (event?: Selector, operatorType?: string): void {
    this.condition.operator = '';
    this.condition.value = '';
    this.values = [];
    this.emptyData = [];

    this.setOperators(event ? event.operatorType : operatorType);
  }

  public setOperators (type: string): void {
    if (type) {
      this.operators = Operator.getOperatorsBySelectorType(type, this.includeExcludeOperators, this.compareOperators, this.newUserOperators, this.mapOperators);
      this.condition.operator = this.operators[0].code;

      console.log(this.condition);
    }
  }

  public removeCondition () {
    this.remove.emit();
  }

  public prepareToSave (): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.condition.fieldName) {
        reject('condition selector');
      } else if (!this.condition.operator) {
        reject('condition operator');
      } else if (!this.condition.value) {
        reject('condition value');
      } else {
        resolve();
      }
    });
  }

  ngOnDestroy () {
    this.onSelectorsAndOperatorsChangedSubscription.unsubscribe();
  }
}
