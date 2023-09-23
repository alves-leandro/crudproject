import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-client-add-edit',
  templateUrl: './client-add-edit.component.html',
  styleUrls: ['./client-add-edit.component.scss'],
})
export class ClientAddEditComponent implements OnInit {
  clientForm: FormGroup;

  type: string[] = ['STOCK_INVESTOR', 'CATTLE_BREEDER'];

  constructor(
    private _fb: FormBuilder,
    private _clientService: ClientService,
    private _dialogRef: MatDialogRef<ClientAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.clientForm = this._fb.group({
      name: '',
      cpf: '',
      email: '',
      type: '',
    });
  }

  ngOnInit(): void {
    this.clientForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.clientForm.valid) {
      if (this.data) {
        this._clientService
          .updateClient(this.data.id, this.clientForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Dados do Cliente alterado com sucesso!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      } else {
        this._clientService.addClient(this.clientForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Cliente adicionado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
}
