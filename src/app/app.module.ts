import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ClipboardModule } from 'ngx-clipboard';

import { AppComponent } from './app.component';

import { fuseConfig } from './fuse-config';
import { AuthService } from './global/services/auth.service';
import { GlobalService } from './global/services/global.service';
import { HttpErrorInterceptor } from './global/services/http-error-interceptor';
import { FuseSampleModule } from './main/content/sample/sample.module';
import { FuseMainModule } from './main/main.module';

const appRoutes: Routes = [
  {
    path: 'segments',
    loadChildren: './main/content/segments/segments.module#SegmentsModule'
  },
  {
    path: '404',
    loadChildren: './main/content/_errors/404/error-404.module#Error404Module'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'stage',
      storageType: 'localStorage'
    }),

    // Fuse Main and Shared modules
    FuseModule.forRoot(fuseConfig),
    FuseSharedModule,
    FuseMainModule,
    FuseSampleModule,
    ClipboardModule,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    AuthService,
    GlobalService,
  ]
})
export class AppModule {
}

