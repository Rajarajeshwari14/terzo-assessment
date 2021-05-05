import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table'
import { LoginComponent } from '../login/login.component';

export interface Data {
  name: string;
  id: number;
}

const EMPLOYEE_DATA: Data[] = [
  { id: 1, name: 'Andrew'},
  { id: 2, name: 'Charles'},
  { id: 3, name: 'Victor'},
  { id: 4, name: 'Olivia'},
  { id: 5, name: 'Martin'},
  { id: 6, name: 'Taylor'},
  { id: 7, name: 'Christine'},
  { id: 8, name: 'Pete'},
  { id: 9, name: 'Willem'},
  { id: 10, name: 'Emma'},
];

const DEPARTMENT_DATA: Data[] = [
  { id: 1, name: 'Sales'},
  { id: 2, name: 'Administration'},
  { id: 3, name: 'Production'},
  { id: 4, name: 'sales'},
  { id: 5, name: 'Administration'},
  { id: 6, name: 'Production'},
  { id: 7, name: 'Production'},
  { id: 8, name: 'sales'},
  { id: 9, name: 'Administration'},
  { id: 10, name: 'Sales'},
];
@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') == null)
      this.logout()
    this.userName = localStorage.getItem('user')  
    if (this.router.url === '/employees'){
      this.dataSource = new MatTableDataSource<Data>(EMPLOYEE_DATA);
      this.details = 'employees'
    }
  }

  columnsToDisplay = ['select', 'id', 'name'];
  displayedColumns: string[] = ['select', 'id', 'name'];
  dataSource = new MatTableDataSource<Data>(DEPARTMENT_DATA);
  selection = new SelectionModel<Data>(true, []);
  selectedDataSource = new MatTableDataSource<Data>();
  userName : String;
  details : String = "departments";

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

    if (this.isAllSelected()) {
      this.selection.clear()
      this.selectedDataSource.data = []
    }
    else {
      this.dataSource.data.forEach(row => this.selection.select(row));
      this.selectedDataSource.data = this.dataSource.data
    }
  }

  toggleSelection(row) {
    this.selection.toggle(row)
    let data = this.selectedDataSource.data

    if (this.selection.isSelected(row))
      data.push(row)
    else
      data = this.selectedDataSource.data.filter(currentRow => row.id !== currentRow.id)

    this.selectedDataSource.data = data
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Data): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  logout(){
      localStorage.removeItem('user')
      this.router.navigate(['login'])
  }
}
