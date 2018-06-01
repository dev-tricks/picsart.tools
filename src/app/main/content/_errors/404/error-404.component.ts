import { Component } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'app-error-404',
  templateUrl: './error-404.component.html',
  styleUrls: ['./error-404.component.scss']
})
export class Error404Component {
  constructor (
    private fuseConfig: FuseConfigService
  ) {
    this.fuseConfig.setConfig({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });
  }
}
