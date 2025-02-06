import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent {
  @Output() customerFormSubmit = new EventEmitter<any>();
  activeModal = inject(NgbActiveModal);
  countries: any[] = [];
  regions: any[] = [];
  customerForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.initializeForm();
  }

  getCountries() {
    this.customerService.getCountries().subscribe((response) => {
      this.countries = Object.values(response.data);
      this.regions = [
        ...new Set(this.countries.map((country) => country.region)),
      ];
    });
  }

  getCountryByRegion(selectedSegion: any) {
    this.customerService.getCountries(selectedSegion).subscribe((response) => {
      this.countries = Object.values(response.data);
    });
  }

  initializeForm() {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      region: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.customerForm.valid) {
      this.customerFormSubmit.emit(this.customerForm.value);
    }
  }

  // Handling field level errors
  getErrorMessage(controlName: string): string {
    const control = this.customerForm.get(controlName);
    if (control?.invalid && control.touched) {
      switch (controlName) {
        case 'name':
          return 'Name is required.';
        case 'email':
          return 'Valid email is required.';
        case 'region':
          return 'Region selection is required.';
        case 'country':
          return 'Country selection is required.';
        default:
          return '';
      }
    }
    return '';
  }
}
