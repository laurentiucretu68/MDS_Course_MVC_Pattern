import { User } from "../app.component";
import {HttpClient} from "@angular/common/http";
import { environment } from "../../environments/environment.development"
import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  newUser: User = {
    name: '',
    email: '',
    age: -1,
    phoneNumber: ''
  }
  constructor(private http: HttpClient, public modalRef: MdbModalRef<ModalComponent>) { }

  public addUser(user: User) {
    console.log(user)
    this.http.post(`${environment.apiUrl}/user`, user).subscribe()
  }
}
