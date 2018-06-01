import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../@fuse/animations';
import { FuseTranslationLoaderService } from '../../../../@fuse/services/translation-loader.service';
import { User } from '../../../global/models/user';
import { AuthService } from '../../../global/services/auth.service';

import { locale as english } from './i18n/en';

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss'],
  animations: fuseAnimations
})
export class SegmentsComponent implements OnInit {
  public user: User;
  public roles: any;

  constructor (private fuseTranslationLoader: FuseTranslationLoaderService,
               private authService: AuthService) {
    this.fuseTranslationLoader.loadTranslations(english);

    this.user = this.authService.user;
    this.roles = this.authService.roles;
  }

  ngOnInit () {
  }

}
