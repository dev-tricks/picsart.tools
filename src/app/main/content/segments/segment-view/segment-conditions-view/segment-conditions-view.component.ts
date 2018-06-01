import { Component, Input, OnInit } from '@angular/core';
import { Segment } from '../../segment';
import { SegmentsService } from '../../segments.service';

@Component({
  selector: 'app-segment-conditions-view',
  templateUrl: './segment-conditions-view.component.html',
  styleUrls: ['./segment-conditions-view.component.scss']
})
export class SegmentConditionsViewComponent implements OnInit {
  @Input() private segment: Segment;

  public conditions: {};

  constructor (private segmentsService: SegmentsService) {
  }

  ngOnInit () {
    this.conditions = JSON.parse(this.segment.json);
    console.log(this.conditions);
  }
}
