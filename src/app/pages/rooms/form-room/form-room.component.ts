import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/shared/interfaces/hotels/hotels.interface';
import { Room } from 'src/app/shared/interfaces/rooms/rooms.interface';
import { HotelsService } from 'src/app/shared/services/hotels.service';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';

@Component({
  selector: 'app-form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.css'],
})
export class FormRoomComponent implements OnInit {
  form!: FormGroup;
  roomId!: number;
  hotels!: Hotel[];
  title = 'Crear';

  constructor(
    private readonly formBuilder: FormBuilder,
    private roomsService: RoomsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sweetalertService: SweetalertService,
    private hotelsService: HotelsService
  ) {}
  ngOnInit(): void {
    this.buildForm();
    this.getParamUrl();
    this.getAllHotels();

    this.roomId ? (this.title = 'Editar') : (this.title = 'Crear');
  }

  onSubmit(): void {
    this.roomId ? this.updateRoom() : this.createRoom();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      price: ['', Validators.required],
      roomType: ['', Validators.required],
      bedsNumber: ['', Validators.required],
      hotelId: ['', Validators.required],
    });
  }

  createRoom(): void {
    this.roomsService.createRoom(this.form.value).subscribe((response) => {
      this.sweetalertService.simpleAlert('Habitación creada');
      this.router.navigateByUrl('/rooms');
    });
  }

  getParamUrl(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (Object.values(params).length === 0) return;

      const { id } = params;
      this.roomId = parseInt(id, 10);
      this.getRoomById(this.roomId);
    });
  }

  getRoomById(id: number): void {
    this.roomsService.getRoomById(id).subscribe((response) => {
      this.form.patchValue(response);
    });
  }

  updateRoom(): void {
    const roomUpdated: Room = { id: this.roomId, ...this.form.value };
    this.roomsService
      .updateRoom(this.roomId, roomUpdated)
      .subscribe((response) => {
        this.sweetalertService.simpleAlert('Habitación actualizada');
        this.router.navigateByUrl('/rooms');
      });
  }

  public getAllHotels(): void {
    this.hotelsService.getAllHotels().subscribe((response) => {
      this.hotels = response;
    });
  }
}
