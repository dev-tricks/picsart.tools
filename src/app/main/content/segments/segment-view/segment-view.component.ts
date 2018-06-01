import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Segment } from '../segment';
import { SegmentsService } from '../segments.service';

@Component({
  selector: 'app-segment-view',
  templateUrl: './segment-view.component.html',
  styleUrls: ['./segment-view.component.scss']
})
export class SegmentViewComponent implements OnInit {
  public segment: Segment;

  constructor (public dialogRef: MatDialogRef<SegmentViewComponent>,
               @Inject(MAT_DIALOG_DATA) private data: any,
               private segmentsService: SegmentsService) {
    this.segment = data.segment;
  }

  ngOnInit () {
    this.segmentsService.getSelectorsAndOperators();
  }

}
