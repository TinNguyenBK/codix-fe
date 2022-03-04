import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';

import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import { ToolbarService } from './toolbar.service';
import { TranslateModule } from '@ngx-translate/core';
import { SocketService } from 'app/core/service/socket.service';
import { PubNubAngular } from 'pubnub-angular2';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatBadgeModule,

    FuseSharedModule,
    FuseSearchBarModule,
    FuseShortcutsModule,
    TranslateModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12,
        },
        vertical: {
          position: 'top',
          distance: 70,
          gap: 10,
        },
      },
    }),
  ],
  exports: [ToolbarComponent],
  providers: [ToolbarService, SocketService, PubNubAngular],
})
export class ToolbarModule {}
