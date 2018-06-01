import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatPaginatorModule,
  MatRippleModule, MatSnackBarModule,
  MatSortModule,
  MatTableModule, MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { AuthGuardService } from '../../../global/services/auth-guard.service';
import { SegmentsComponent } from './segments.component';
import { SegmentsService } from './segments.service';
import { SegmentListComponent } from './segment-list/segment-list.component';
import { SegmentViewComponent } from './segment-view/segment-view.component';
import { SegmentFormComponent } from './segment-form/segment-form.component';
import { SegmentConditionsComponent } from './segment-form/segment-conditions/segment-conditions.component';
import { SegmentConditionsViewComponent } from './segment-view/segment-conditions-view/segment-conditions-view.component';
import { SegmentConditionsViewGroupComponent } from './segment-view/segment-conditions-view/segment-conditions-view-group/segment-conditions-view-group.component';
import { SegmentConditionsViewConditionComponent } from './segment-view/segment-conditions-view/segment-conditions-view-condition/segment-conditions-view-condition.component';
import { SegmentConditionsGroupComponent } from './segment-form/segment-conditions/segment-conditions-group/segment-conditions-group.component';
import { SegmentConditionsConditionComponent } from './segment-form/segment-conditions/segment-conditions-condition/segment-conditions-condition.component';
import { SegmentConditionsNewConditionComponent } from './segment-form/segment-conditions/segment-conditions-new-condition/segment-conditions-new-condition.component';

const routes = [
  {
    path: '',
    component: SegmentsComponent,
    resolve: {
      SegmentsService
    }
  },
  {
    path: 'create',
    component: SegmentFormComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['EDIT_SEGMENTS']}
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslateModule,
    FuseSharedModule,
    CdkTableModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRippleModule,
    MatDialogModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ClipboardModule,
  ],
  declarations: [
    SegmentsComponent,
    SegmentListComponent,
    SegmentViewComponent,
    SegmentFormComponent,
    SegmentConditionsComponent,
    SegmentConditionsViewComponent,
    SegmentConditionsViewGroupComponent,
    SegmentConditionsViewConditionComponent,
    SegmentConditionsGroupComponent,
    SegmentConditionsConditionComponent,
    SegmentConditionsNewConditionComponent,
  ],
  providers: [
    SegmentsService,
  ],
  exports: [
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  entryComponents: [
    SegmentViewComponent,
  ]
})
export class SegmentsModule {}
