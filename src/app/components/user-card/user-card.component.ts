import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: any = {};
  @Output() edit = new EventEmitter<boolean>();
  constructor(private userservice: UsersService) {
    
   }

  ngOnInit() {
    console.log(this.user);
  }

  deleteuser() {
this.userservice.deleteusers(this.user.id).subscribe(
  (res) => {
    this.userservice.createNotification('success', 'Success' , 'User Removed Successfully');
  }
);
  }
  cancel() {

  }

  edituser() {
    this.edit.emit(this.user.id);
  }

}
