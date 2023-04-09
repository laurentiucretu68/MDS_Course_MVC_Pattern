import {HttpClient} from "@angular/common/http";
import { environment } from "../../environments/environment.development"
import {Component, EventEmitter, Output} from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  addUserForm: FormGroup;
  submitted: boolean;
  @Output() userSaved: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient, public modalRef: MdbModalRef<ModalComponent>) {
    this.submitted = false
    this.addUserForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl('', [Validators.required, Validators.min(14), Validators.max(120)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  insertUser() {
    this.submitted = true
    if (!this.addUserForm.valid) {
      return;
    }

    const user = {
      name: this.addUserForm?.get('name')?.value,
      email: this.addUserForm.get('email')?.value,
      age: this.addUserForm.get('age')?.value,
      phoneNumber: this.addUserForm.get('phoneNumber')?.value
    }
    this.http.post(`${environment.apiUrl}/user`, user).subscribe()
    this.addUserForm.reset()
    this.submitted = false
    this.userSaved.emit();
  }
}
