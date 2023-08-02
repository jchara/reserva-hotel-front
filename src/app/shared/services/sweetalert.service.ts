import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  constructor() {}

  simpleAlert(
    title: string,
    position?: SweetAlertPosition,
    icon?: SweetAlertIcon
  ): void {
    Swal.fire({
      title: title,
      position: position ? position : 'center',
      icon: icon ? icon : 'success',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  confirmAlert(): Promise<any> {
    return Swal.fire({
      title: 'Esta seguro de eliminar este registro?',
      text: 'No podrá revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    });
  }
}
