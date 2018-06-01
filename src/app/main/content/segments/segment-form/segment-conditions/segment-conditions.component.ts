import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Segment } from '../../segment';
import { Group } from './group';
import { GroupDecoded } from './group-decoded';
import { SegmentConditionsGroupComponent } from './segment-conditions-group/segment-conditions-group.component';

@Component({
  selector: 'app-segment-conditions',
  templateUrl: './segment-conditions.component.html',
  styleUrls: ['./segment-conditions.component.scss']
})
export class SegmentConditionsComponent implements OnInit, OnDestroy {
  @ViewChild(SegmentConditionsGroupComponent) private segmentConditionsGroupComponent: SegmentConditionsGroupComponent;
  @Input() private segment: Segment;

  private onCanSaveChangedSubscription: Subscription;

  public groupDecoded: GroupDecoded;

  constructor (public snackBar: MatSnackBar) {
    this.groupDecoded = Group.decode(new Group(), true);
  }

  ngOnInit () {

  }

  public addGroup (): void {
    this.groupDecoded.conditions.push(Group.decode(new Group(), true));
  }

  public prepareToSave (): Promise<any> {
    return new Promise((resolve, reject) => {
      this.segmentConditionsGroupComponent
        .prepareToSave()
        .then((data) => {
          this.segment.json = JSON.stringify(Group.encode(this.groupDecoded));

          resolve(data);
        })
        .catch((err) => {
          if (err) {
            this.snackBar.open(err, 'End now', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          }

          reject(err);
        });
    });
  }

  ngOnDestroy () {
    this.onCanSaveChangedSubscription.unsubscribe();
  }
}
