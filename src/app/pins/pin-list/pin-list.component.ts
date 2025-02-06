import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerFormComponent } from '../../shared/customer-form/customer-form.component';
import { PinFormComponent } from '../../shared/pin-form/pin-form.component';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrl: './pin-list.component.scss',
})
export class PinListComponent implements OnInit {
  customers: any[] = [];
  pins: any[] = [];

  constructor(
    private modalService: NgbModal,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.fetchCustomers();
    this.fetchPins();
  }

  fetchCustomers() {
    this.customers = this.storageService.getArray<{}>('customers');
  }

  fetchPins() {
    this.pins = this.storageService.getArray<{}>('pins');
  }

  openAddPinModal() {
    const modalRef = this.modalService.open(PinFormComponent, {
      // size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.customers = this.customers;
    modalRef.componentInstance.pinFormSubmit.subscribe((pinData: any) => {
      this.handlePinSubmission(pinData);
      modalRef.close();
    });
  }

  handlePinSubmission(pinData: any) {
    this.storageService.addToArray('pins', pinData);
    this.fetchPins();
  }

  openAddCustomerModal() {
    const modalRef = this.modalService.open(CustomerFormComponent, {
      centered: true,
    });
    modalRef.componentInstance.customerFormSubmit.subscribe(
      (customerData: any) => {
        this.handleCustomerSubmission(customerData);
        modalRef.close();
      }
    );
  }

  handleCustomerSubmission(customerData: any) {
    this.storageService.addToArray('customers', customerData);
    this.fetchCustomers();
  }

  resetData() {
    if (confirm('Are you sure you want to reset all data?')) {
      this.storageService.clear();
    }
  }
}
