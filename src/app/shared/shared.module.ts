import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PinFormComponent } from './pin-form/pin-form.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxSelectModule } from 'ngx-select-ex';

@NgModule({
  declarations: [PinFormComponent, CustomerFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSelectModule,
    FileUploadModule,
  ],
})
export class SharedModule {}
