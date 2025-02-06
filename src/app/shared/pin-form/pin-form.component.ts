import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import appConstant from '../utils/app.constant';

// Media Upload API endpoint
const URL = appConstant.URL.MEDIA;

@Component({
  selector: 'app-pin-form',
  templateUrl: './pin-form.component.html',
  styleUrl: './pin-form.component.scss',
})
export class PinFormComponent {
  activeModal = inject(NgbActiveModal);
  @Input() customers: any[] = [];
  @Output() pinFormSubmit = new EventEmitter<any>();

  pinForm!: FormGroup;
  uploader: FileUploader = new FileUploader({
    url: URL,
    allowedFileType: ['image'],
  });

  isFileOver: boolean = false;
  isLoading: boolean = false;
  submitted: boolean = false;

  response: string;

  constructor(private fb: FormBuilder) {
    this.uploader = new FileUploader({
      url: URL,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      queueLimit: 1,
      maxFileSize: 2 * 1024 * 1024, // 2MB limit
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.response = '';
    // this.uploader.response.subscribe((res) => (this.response = res));
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      this.response = response;
    };
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.pinForm = this.fb.group({
      title: ['', Validators.required],
      image: [null, Validators.required],
      collaboratories: [[], Validators.required],
      privacy: ['Public', Validators.required],
    });
  }

  onFileDrop(files: any[]): void {
    if (files) {
      Array.from(files).forEach((file) => {
        this.uploader.addToQueue([file]);
        this.pinForm.patchValue({ image: file });
      });
    }
    this.isFileOver = false;
  }

  // Change styles when file is dragged over
  onFileOver(event: any): void {
    this.isFileOver = true;
  }

  submitForm() {
    this.submitted = true;

    if (this.pinForm.valid && this.uploader.queue.length > 0) {
      this.isLoading = true;
      // Start the upload
      this.uploader.uploadAll();

      // Emit form data after upload response
      this.uploader.onCompleteItem = () => {
        try {
          // const uploadedFile = this.uploader.queue[0].file;
          const uploadedData = JSON.parse(this.response);
          // const uploadedData = JSON.parse((uploadedFile as any).response);

          if (uploadedData.secure_url) {
            this.pinForm.patchValue({ image: uploadedData.secure_url });
          }

          this.pinFormSubmit.emit(this.pinForm.value);
          this.isLoading = true;
        } catch (error) {
          this.isLoading = true;
          alert(appConstant.APP_MESSAGES.UPLOAD_ERROR + error);
        }
      };
    }
  }

  // Handling field level errors
  getErrorMessage(controlName: string): string {
    const control = this.pinForm.get(controlName);
    if (control?.invalid && control.touched) {
      switch (controlName) {
        case 'title':
          return 'Title is required.';
        case 'image':
          return 'Image selection is required.';
        case 'collaboratories':
          return 'At least one collaboratory must be selected.';
        case 'privacy':
          return 'Privacy selection is required.';
        default:
          return '';
      }
    }
    return '';
  }
}
