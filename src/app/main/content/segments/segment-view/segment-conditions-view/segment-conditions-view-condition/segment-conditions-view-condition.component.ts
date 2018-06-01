import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Operator } from '../../../operator';
import { Condition } from '../../../segment-form/segment-conditions/condition';
import { SegmentsService } from '../../../segments.service';
import { Selector } from '../../../selector';

@Component({
  selector: 'app-segment-conditions-view-condition',
  templateUrl: './segment-conditions-view-condition.component.html',
  styleUrls: ['./segment-conditions-view-condition.component.scss']
})
export class SegmentConditionsViewConditionComponent implements OnInit, OnDestroy {
  @Input() public condition: Condition;

  private onSelectorsAndOperatorsChangedSubscription: Subscription;

  private selectors: Selector[];
  private includeExcludeOperators: Operator[];
  private compareOperators: Operator[];
  private newUserOperators: Operator[];
  private mapOperators: Operator[];

  public conditionText: string = '';
  public conditionValue: string = '';

  constructor (public segmentsService: SegmentsService) { }

  ngOnInit () {
    this.onSelectorsAndOperatorsChangedSubscription = this.segmentsService.onSelectorsAndOperatorsChanged
      .subscribe(([selectors, includeExcludeOperators, compareOperators, newUserOperators, mapOperators]: [Selector[], Operator[], Operator[], Operator[], Operator[]]) => {
        if (selectors) {
          this.selectors = selectors;
          this.includeExcludeOperators = includeExcludeOperators;
          this.compareOperators = compareOperators;
          this.newUserOperators = newUserOperators;
          this.mapOperators = mapOperators;

          this.setConditionText();
        }
      });
  }

  setConditionText () {
    let selector = this.selectors.find((selector: Selector) => selector.name === this.condition.fieldName);
    let operators: Operator[];

    switch (selector.operatorType) {
      case 'COMPARE':
        operators = this.compareOperators;
        break;
      case 'INCLUDE_EXCLUDE':
        operators = this.includeExcludeOperators;
        break;
    }

    let operator = operators.find((operator: Operator) => operator.code === this.condition.operator);

    this.conditionText = selector.displayName + ' ' + operator.displayName + ':';
    this.conditionValue = this.condition.value;
  }

  ngOnDestroy () {
    this.onSelectorsAndOperatorsChangedSubscription.unsubscribe();
  }
}
