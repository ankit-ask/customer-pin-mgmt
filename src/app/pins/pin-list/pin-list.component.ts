import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerFormComponent } from '../../shared/customer-form/customer-form.component';
import { PinFormComponent } from '../../shared/pin-form/pin-form.component';

@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrl: './pin-list.component.scss',
})
export class PinListComponent {
  constructor(private modalService: NgbModal) {}

  openAddPinModal() {
    const modalRef = this.modalService.open(PinFormComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.pinFormSubmit.subscribe((pinData: any) => {
      this.handlePinSubmission(pinData);
      modalRef.close();
    });
  }

  handlePinSubmission(pinData: any) {
    console.log('Submit Pin Data =>', pinData);
  }

  openAddCustomerModal() {
    const modalRef = this.modalService.open(CustomerFormComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.formSubmit = (customerData: any) => {
      modalRef.close();
    };
  }
}
