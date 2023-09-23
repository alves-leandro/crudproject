import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientAddEditComponent } from './client-add-edit/client-add-edit.component';
import { ClientService } from './services/client.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'cpf', 'email', 'type', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _clientService: ClientService,
    private _coreService: CoreService,
  ) {}

  ngOnInit(): void {
    this.getClientList();
  }

  openAddEditClientForm() {
    const dialogRef = this._dialog.open(ClientAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClientList();
        }
      },
    });
  }

  getClientList() {
    this._clientService.getClientList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditClientForm(data: any) {
    const dialogRef = this._dialog.open(ClientAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClientList();
        }
      },
    });
  }

  deleteClient(id: number) {
    this._clientService.deleteClient(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Cliente removido com sucesso!', 'done');
        this.getClientList();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }


}
