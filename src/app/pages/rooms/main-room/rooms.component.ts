import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/shared/interfaces/rooms/rooms.interface';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  hasContent: boolean = false;
  rooms: Room[] = [];

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
    private sweetalertService: SweetalertService
  ) {}

  ngOnInit(): void {
    this.getAllRooms();
  }

  getAllRooms(): void {
    this.roomsService.getAllRooms().subscribe((response) => {
      this.hasContent = response.length > 0;
      this.rooms = response;
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
