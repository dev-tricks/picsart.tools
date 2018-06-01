import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { FuseTranslationLoaderService } from '../../../../../@fuse/services/translation-loader.service';
import { AuthService } from '../../../../global/services/auth.service';
import { GlobalService } from '../../../../global/services/global.service';
import { Segment } from '../segment';
import { SegmentsService } from '../segments.service';

import { locale as english } from '../i18n/en';
import { SegmentConditionsComponent } from './segment-conditions/segment-conditions.component';

@Component({
  selector: 'app-segment-form',
  templateUrl: './segment-form.component.html',
  styleUrls: ['./segment-form.component.scss'],
  animations: fuseAnimations
})
export class SegmentFormComponent implements OnInit {
  @ViewChild(SegmentConditionsComponent) private segmentConditionsComponent: SegmentConditionsComponent;

  private onCanSaveChangedSubscription: Subscription;

  public segment: Segment;
  public segmentForm: FormGroup;
  public segmentFormErrors: any;

  constructor (private fuseTranslationLoader: FuseTranslationLoaderService,
               private globalService: GlobalService,
               private segmentsService: SegmentsService,
               private formBuilder: FormBuilder,
               private authService: AuthService) {
    this.fuseTranslationLoader.loadTranslations(english);

    this.segmentFormErrors = {
      name: {},
    };
  }

  ngOnInit () {
    this.globalService.getCountries();
    this.segmentsService.getSelectorsAndOperators();

    this.segment = new Segment();

    this.segmentForm = this.formBuilder
      .group({
        name: [{value: 'aaaa', disabled: false}, Validators.required],
        user: [{value: this.authService.user.fullName, disabled: true}],
        description: [{value: '', disabled: false}],
      });

    this.segmentForm.valueChanges
      .subscribe(() => {
        this.onSegmentFormValuesChanged();
      });
  }

  public onSegmentFormValuesChanged (): void {
    for (const field in this.segmentFormErrors) {
      if (!this.segmentFormErrors.hasOwnProperty(field)) {
        continue;
      }

      this.segmentFormErrors[field] = {};

      const control = this.segmentForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.segmentFormErrors[field] = control.errors;
      }
    }
  }

  public prepareToSaveSegment (): void {
    this.segmentConditionsComponent
      .prepareToSave()
      .then((data) => {
        console.log(true, data);
      })
      .catch((err) => {
        console.log(this.segment);
        console.log(err);
      });
  }

  public saveSegment (): void {
    console.log(this.segment);

    // this.segmentsService
    //   .saveSegment(this.segment)
    //   .then((data) => {
    //     this.saving = false;
    //     console.log(data);
    //
    //     this.segmentsService.getSegments();
    //   })
    //   .catch((err) => {
    //     this.saving = false;
    //     console.log(err);
    //   });
  }

  ngOnDestroy () {
    this.onCanSaveChangedSubscription.unsubscribe();
  }
}
