import { Component, OnInit } from '@angular/core';

import { Hotel } from 'src/app/shared/interfaces/hotels/hotels.interface';
import { HotelsService } from 'src/app/shared/services/hotels.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent implements OnInit {
  test: string = 'Chara';
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

  constructor(private hotelsService: HotelsService) {}

  ngOnInit(): void {
    this.getAllHotels();
  }
  public getAllHotels(): void {
    this.hotelsService.getAllHotels().subscribe((response) => {
      this.hotels = response;
    });
  }

  public createHotel(hotel: Hotel): void {
    this.hotelsService.createHotel(hotel).subscribe((response) => {
      this.getAllHotels();
    });
  }

  public deleteHotel(id: number): void {
    this.hotelsService.deleteHotel(id).subscribe((response) => {
      this.getAllHotels();
    });
  }
}
