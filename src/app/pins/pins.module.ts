import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PinsRoutingModule } from './pins-routing.module';
import { PinListComponent } from './pin-list/pin-list.component';
import { NoDataCardComponent } from '../shared/no-data-card/no-data-card.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PinListComponent],
  imports: [
    CommonModule,
    PinsRoutingModule,
    NoDataCardComponent,
    NgbPopoverModule,
  ],
})
export class PinsModule {}
