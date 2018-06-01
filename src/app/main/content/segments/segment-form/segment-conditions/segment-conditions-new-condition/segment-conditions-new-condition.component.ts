import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SegmentsService } from '../../../segments.service';
import { Selector } from '../../../selector';
import { Condition } from '../condition';
import { GroupDecoded } from '../group-decoded';

@Component({
  selector: 'app-segment-conditions-new-condition',
  templateUrl: './segment-conditions-new-condition.component.html',
  styleUrls: ['./segment-conditions-new-condition.component.scss']
})
export class SegmentConditionsNewConditionComponent implements OnInit, OnDestroy {
  @Input() public groupDecoded: GroupDecoded;

  private onSelectorsAndOperatorsChangedSubscription: Subscription;

  public conditionTypes = Condition.getTypes();
  public conditionType: number;
  public selectors: Selector[];
  public selectorsFiltered: Selector[];
  public selectorName: string;

  constructor (private segmentsService: SegmentsService) { }

  ngOnInit () {
    this.onSelectorsAndOperatorsChangedSubscription = this.segmentsService.onSelectorsAndOperatorsChanged
      .subscribe(([selectors]: [Selector[]]) => {
        if (selectors) {
          this.selectors = selectors;
        }
      });
  }

  public onConditionTypeSelect (event): void {
    this.selectorsFiltered = Selector.filterByType(event.types, this.selectors);
    this.selectorName = undefined;
  }

  public addCondition (): void {
    this.groupDecoded.conditions.push(new Condition({
      fieldName: this.selectorName
    }));

    this.conditionType = null;
    this.selectorName = undefined;

    this.selectorsFiltered = [];
  }

  ngOnDestroy () {
    this.onSelectorsAndOperatorsChangedSubscription.unsubscribe();
  }
}
