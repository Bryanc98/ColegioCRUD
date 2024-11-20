import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showCustomAlert(options: SweetAlertOptions): void {
    Swal.fire(options);
  }

  showAlert(title: string, message: string, icon: SweetAlertIcon = 'success'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonColor: '#3085d6'
    });
  }

  showConfirmation(title: string = '¿Estás seguro?', message: string, confirmCallback: () => void): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        confirmCallback();
      }
    });
  }
}
