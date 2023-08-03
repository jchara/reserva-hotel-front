import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Hotel } from 'src/app/shared/interfaces/hotels/hotels.interface';
import { HotelsService } from 'src/app/shared/services/hotels.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';

@Component({
  selector: 'app-main-hotels',
  templateUrl: './main-hotels.component.html',
  styleUrls: ['./main-hotels.component.css'],
})
export class HotelsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hotels!: MatTableDataSource<Hotel>;
  hasContent: boolean = false;
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

  constructor(
    private hotelsService: HotelsService,
    private router: Router,
    private sweetalertService: SweetalertService,
    private paginatorIntl: MatPaginatorIntl
  ) {}

  ngOnInit(): void {
    this.getAllHotels();
  }
  
  public getAllHotels(): void {
    this.hotelsService.getAllHotels().subscribe((response) => {
      this.hasContent = response.length > 0;
      this.paginatorIntl.itemsPerPageLabel = 'Hoteles por página:';
      this.hotels = new MatTableDataSource<Hotel>(response);
      this.hotels.paginator = this.paginator;
    });
  }

  public deleteHotel(id: number): void {
    this.sweetalertService.confirmAlert().then((result) => {
      if (result.isConfirmed) {
        this.hotelsService.deleteHotel(id).subscribe((response) => {
          this.getAllHotels();
        });
        this.sweetalertService.simpleAlert('Hotel eliminado');
      }
    });
  }

  public setHotelId(id: number): void {
    this.router.navigateByUrl(`hotels/form?id=${id}`);
  }
}
