import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { NzNotificationService } from 'ng-zorro-antd';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  modalTitle: string;
  title = 'tvf-assignment';
  users = [];
  page_no = 1;
  total_users;
  isVisible;
  currentUser: any ={};

  constructor(private userService: UsersService) {

  }
  ngOnInit() {
    this.getusers(1);
  }

  getusers(page_no) {
    this.userService.getusers(page_no, 10).subscribe(
      (response) => {
        this.users = response.json().data;
        console.log(response.json());
        this.page_no = page_no;
        this.total_users = response.json().total;
        window.scrollTo(0, 0);
      }
    );
  }

  paginate(event) {
    this.getusers(event);
  }

  AddUser(): void {
    console.log('Button ok clicked!');
    if (this.modalTitle === 'Add New User') {
      this.userService.createuser(this.currentUser).subscribe(
        (res) => {
          console.log(res.json());
          this.isVisible = false;
          this.userService.createNotification('success', 'Success' , 'User Added Successfully');
          this.currentUser = {};
        }
      );
    } else {
      const payload = {
        "name": this.currentUser.name,
        "job": this.currentUser.job
    };
      const id = this.currentUser.id;
      this.userService.updateuser(id, payload).subscribe(
        (res) => {
          console.log(res.json());
          this.isVisible = false;
          this.userService.createNotification('success', 'Success' , 'User Upadted Successfully');
          this.currentUser = {};
        }
      );
    }
    
    
  }

  Cancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  showModal(type): void {
    this.isVisible = true;
    if (type == 'add') {
      this.modalTitle = 'Add New User';
    } else {
      this.modalTitle = 'Edit User';
    }
  }

  onedit(event) {
    console.log(event);
    this.currentUser = this.users.find(u => {return u.id === event});
    console.log(this.currentUser);
    this.showModal('edit');
  }


}
