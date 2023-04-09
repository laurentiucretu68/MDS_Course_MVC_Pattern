import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment.development";
import { ModalComponent } from "./modal/modal.component"
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

export interface User {
  _id?: string
  name: string
  email: string
  age: number
  phoneNumber: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'Name', 'Email', 'Age', 'Phone Number', 'Update user', 'Delete User']
  dataSource: User[] = []
  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private http: HttpClient, private modalService: MdbModalService) {}

  ngOnInit(): void {
    this.getUsers()
  }

  public openUserModal(){
    this.modalRef = this.modalService.open(ModalComponent)

    this.modalRef.onClose.subscribe(() => {
      this.getUsers()
    })
  }

  public getUsers() {
    this.http.get(`${environment.apiUrl}/users`).subscribe((data) => {
      this.dataSource = data as User[]
    })
  }

  public deleteUser(_id: string) {
    this.http.delete(`${environment.apiUrl}/user/${_id}`).subscribe(() => {
      this.getUsers()
    })
  }
}
