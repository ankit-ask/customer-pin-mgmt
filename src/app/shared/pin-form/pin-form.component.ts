import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';

// TODO::API endpoint (Set up later)
const URL = 'https://ankitsing.co/api/';

@Component({
  selector: 'app-pin-form',
  templateUrl: './pin-form.component.html',
  styleUrl: './pin-form.component.scss',
})
export class PinFormComponent {
  @Input() pinData: any = null; // For edit mode
  @Output() pinFormSubmit = new EventEmitter<any>();

  pinForm!: FormGroup;
  uploader: FileUploader = new FileUploader({
    url: URL,
    allowedFileType: ['image'],
  });

  isFileOver: boolean = false;

  // TODO::Replace with dynamic data
  collaboratories = [
    { id: 1, name: 'Customer 1' },
    { id: 2, name: 'Customer 2' },
    { id: 3, name: 'Customer 3' },
  ];

  itemId: any;
  response: string;

  constructor(private fb: FormBuilder) {
    this.uploader = new FileUploader({
      url: URL,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      queueLimit: 1,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.response = '';
    this.uploader.response.subscribe((res) => (this.response = res));
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.pinForm = this.fb.group({
      title: [this.pinData?.title || '', Validators.required],
      image: [null, Validators.required],
      collaboratories: [
        this.pinData?.collaboratories || [],
        Validators.required,
      ],
      privacy: [this.pinData?.privacy || 'Public', Validators.required],
    });
  }

  onFileDrop(files: any[]): void {
    if (files) {
      Array.from(files).forEach((file) => {
        this.uploader.addToQueue([file]);
        // this.pinForm.patchValue({ image: file });
      });
    }
    this.isFileOver = false;
  }

  // Change styles when file is dragged over
  onFileOver(event: any): void {
    this.isFileOver = true;
  }

  submitForm() {
    // if (this.pinForm.valid) {
    this.pinFormSubmit.emit(this.pinForm.value);
    // }
  }
}
