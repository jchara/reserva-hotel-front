import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { User, UserID } from 'src/app/shared/interfaces/users/users.interface';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.css'],
})
export class MainUserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hasContent: boolean = false;
  users!: MatTableDataSource<User>;

  displayedColumns: string[] = [
    'documentType',
    'documentNumber',
    'name',
    'phoneNumber',
    'email',
    'actions',
  ];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private sweetalertService: SweetalertService,
    private paginatorIntl: MatPaginatorIntl
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.usersService.getAllUsers().subscribe((response) => {
      this.hasContent = response.length > 0;
      this.paginatorIntl.itemsPerPageLabel = 'Usuarios por página:';
      this.users = new MatTableDataSource<User>(response);
      this.users.paginator = this.paginator;
    });
  }

  setUserId(id: UserID): void {
    this.router.navigateByUrl(
      `users/form?type=${id.documentType}&number=${id.documentNumber}`
    );
  }

  deleteUser(id: UserID): void {
    this.sweetalertService.confirmAlert().then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(id).subscribe((response) => {
          this.getAllUsers();
        });
        this.sweetalertService.simpleAlert('Usuario eliminado');
      }
    });
  }
}
