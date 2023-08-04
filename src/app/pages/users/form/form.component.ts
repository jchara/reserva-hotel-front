import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserID } from 'src/app/shared/interfaces/users/users.interface';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  title: string = 'Crear';
  form!: FormGroup;
  userID!: UserID;
  hide: boolean = true;
  documentTypes!: { value: string; viewValue: string }[];

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private sweetalertService: SweetalertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.documentTypes = [
      { value: 'CC', viewValue: 'Cédula de ciudadanía' },
      { value: 'CE', viewValue: 'Cédula de extranjería' },
      { value: 'TI', viewValue: 'Tarjeta de identidad' },
      { value: 'PP', viewValue: 'Pasaporte' },
    ];
  }

  ngOnInit(): void {
    this.buildForm();
    this.getParamsUrl();

    this.userID ? (this.title = 'Editar') : (this.title = 'Crear');
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.userID ? this.updateUser() : this.createUser();
  }

  createUser(): void {
    const { documentType, documentNumber } = this.form.value;
    const id = { documentType, documentNumber };
    const user = { ...this.form.value, id, rolId: null };
    this.usersService.createUser(user).subscribe((response) => {
      this.sweetalertService.simpleAlert('Usuario creado');
      this.router.navigateByUrl('users');
    });
  }

  getParamsUrl(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (Object.values(params).length === 0) return;
      const { type, number } = params;
      if (type && number) {
        this.userID = { documentType: type, documentNumber: number };
        this.getUserById(this.userID);
      }
    });
  }

  getUserById(id: UserID): void {
    this.usersService.getUserById(id).subscribe((response) => {
      this.form.patchValue({
        documentType: response.id.documentType,
        documentNumber: response.id.documentNumber,
        name: response.name,
        phoneNumber: response.phoneNumber,
        email: response.email,
        password: null,
      });
    });
  }

  updateUser(): void {
    const { documentType, documentNumber } = this.form.value;
    const id = { documentType, documentNumber };
    const user = { ...this.form.value, id, rolId: null };
    this.usersService.updateUser(id, user).subscribe((response) => {
      this.sweetalertService.simpleAlert('Usuario actualizado');
      this.router.navigateByUrl('users');
    });
  }
}
