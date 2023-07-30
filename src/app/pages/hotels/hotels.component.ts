import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hotel } from 'src/app/shared/interfaces/hotels/hotels.interface';
import { HotelsService } from 'src/app/shared/services/hotels.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent implements OnInit {
  hotels: Hotel[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'phoneNumber',
    'address',
    'email',
    'totalRooms',
    'reserveCapacity',
    'actions',
  ];

  constructor(private hotelsService: HotelsService, private router: Router) {}

  ngOnInit(): void {
    this.getAllHotels();
  }
  public getAllHotels(): void {
    this.hotelsService.getAllHotels().subscribe((response) => {
      this.hotels = response;
    });
  }

  public deleteHotel(id: number): void {
    this.hotelsService.deleteHotel(id).subscribe((response) => {
      this.getAllHotels();
    });
  }

  public setHotelId(id: number): void {
    this.router.navigateByUrl(`hotels/form?id=${id}`);
  }
}
