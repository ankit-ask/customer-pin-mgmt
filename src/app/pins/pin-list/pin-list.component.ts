import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerFormComponent } from '../../shared/customer-form/customer-form.component';
import { PinFormComponent } from '../../shared/pin-form/pin-form.component';
import { StorageService } from '../../services/storage.service';
import { Observable } from 'rxjs';
import { Pin } from '../../shared/utils/pins.models';
import { Customer } from '../../shared/utils/customers.models';

@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrl: './pin-list.component.scss',
})
export class PinListComponent {
  customers$: Observable<Customer[]> | undefined;
  pins$: Observable<Pin[]> | undefined;

  constructor(
    private modalService: NgbModal,
    private storageService: StorageService
  ) {
    this.customers$ = this.storageService.customers$;
    this.pins$ = this.storageService.pins$;
  }

  openAddPinModal() {
    const modalRef = this.modalService.open(PinFormComponent, {
      centered: true,
    });
    if (this.customers$) {
      this.customers$.subscribe((customers) => {
        modalRef.componentInstance.customers = customers;
      });
    }
    modalRef.closed.subscribe({
      next: (_) => {
        this.storageService.addToArray('pins', _);
      },
      error: (_) => {},
    });
  }

  openAddCustomerModal() {
    const modalRef = this.modalService.open(CustomerFormComponent, {
      centered: true,
    });

    modalRef.closed.subscribe({
      next: (_) => {
        this.storageService.addToArray('customers', _);
      },
      error: (_) => {},
      complete: () => {},
    });
  }

  resetData() {
    if (confirm('Are you sure you want to reset all data?')) {
      this.storageService.clear();
    }
  }
}
