import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Room } from 'src/app/shared/interfaces/rooms/rooms.interface';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';

@Component({
  selector: 'app-main-rooms',
  templateUrl: './main-rooms.component.html',
  styleUrls: ['./main-rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hasContent: boolean = false;
  rooms!: MatTableDataSource<Room>;

  displayedColumns: string[] = [
    'roomNumber',
    'price',
    'roomType',
    'bedsNumber',
    'hotelId',
    'actions',
  ];

  constructor(
    private roomsService: RoomsService,
    private router: Router,
    private sweetalertService: SweetalertService,
    private paginatorIntl: MatPaginatorIntl
  ) {}

  ngOnInit(): void {
    this.getAllRooms();
  }

  getAllRooms(): void {
    this.roomsService.getAllRooms().subscribe((response) => {
      this.hasContent = response.length > 0;
      this.paginatorIntl.itemsPerPageLabel = 'Habitaciones por página:';
      this.rooms = new MatTableDataSource<Room>(response);
      this.rooms.paginator = this.paginator;
    });
  }

  deleteRoom(id: number): void {
    this.sweetalertService.confirmAlert().then((result) => {
      if (result.isConfirmed) {
        this.roomsService.deleteRoom(id).subscribe((response) => {
          this.getAllRooms();
        });
        this.sweetalertService.simpleAlert('Hotel eliminado');
      }
    });
  }

  public setRoomId(id: number): void {
    this.router.navigateByUrl(`rooms/form?id=${id}`);
  }
}
