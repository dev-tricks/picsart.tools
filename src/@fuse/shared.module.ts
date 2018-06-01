import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,

    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    FuseDirectivesModule,
    FusePipesModule,
  ],
  exports: [
    CommonModule,

    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    FuseDirectivesModule,
    FusePipesModule,
  ]
})
export class FuseSharedModule {
}
