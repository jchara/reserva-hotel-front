import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Hotel } from 'src/app/shared/interfaces/hotels/hotels.interface';
import { HotelsService } from 'src/app/shared/services/hotels.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';

@Component({
  selector: 'app-form-hotel',
  templateUrl: './form-hotel.component.html',
  styleUrls: ['./form-hotel.component.css'],
})
export class FormHotelComponent implements OnInit {
  form!: FormGroup;
  hotelId!: number;
  title = 'Crear';

  constructor(
    private readonly formBuilder: FormBuilder,
    private hotelsService: HotelsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sweetalertService: SweetalertService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getParamUrl();
    this.hotelId ? (this.title = 'Editar') : (this.title = 'Crear');
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.hotelId ? this.updateHotel() : this.createHotel();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      totalRooms: ['', Validators.required],
      reserveCapacity: ['', Validators.required],
    });
  }

  createHotel(): void {
    this.hotelsService.createHotel(this.form.value).subscribe((response) => {
      this.sweetalertService.simpleAlert('Hotel creado');
      this.router.navigateByUrl('/hotels');
    });
  }

  getParamUrl(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (Object.values(params).length === 0) return;

      const { id } = params;
      this.hotelId = parseInt(id, 10);
      this.getHotelById(this.hotelId);
    });
  }

  getHotelById(id: number): void {
    this.hotelsService.getHotelById(id).subscribe((response) => {
      this.form.patchValue(response);
    });
  }

  updateHotel(): void {
    const hotelUpdated: Hotel = { id: this.hotelId, ...this.form.value };
    this.hotelsService
      .updateHotel(this.hotelId, hotelUpdated)
      .subscribe((response) => {
        this.sweetalertService.simpleAlert('Hotel actualizado');
        this.router.navigateByUrl('/hotels');
      });
  }
}
