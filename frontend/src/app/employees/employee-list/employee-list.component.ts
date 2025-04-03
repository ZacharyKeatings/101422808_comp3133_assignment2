import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { Router } from '@angular/router';

import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [CurrencyPipe, DatePipe],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchDesignation: string = '';
  searchDepartment: string = '';

  displayedColumns: string[] = [
    'first_name', 'last_name', 'email', 'gender',
    'designation', 'salary', 'date_of_joining', 'department',
    'actions'
  ];

  constructor(
    private employeeService: EmployeeService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe((res: any) => {
      this.employees = res.data.getAllEmployees;
      this.filteredEmployees = [...this.employees];
    });
  }

  search(): void {
    if (!this.searchDesignation && !this.searchDepartment) {
      this.filteredEmployees = [...this.employees];
      return;
    }

    this.employeeService
      .searchEmployees(this.searchDepartment, this.searchDesignation)
      .subscribe((res: any) => {
        this.filteredEmployees = res.data.searchEmployee;
      });
  }

  clearSearch(): void {
    this.searchDepartment = '';
    this.searchDesignation = '';
    this.filteredEmployees = [...this.employees];
  }

  viewEmployee(id: string): void {
    this.router.navigate([`/employees/view/${id}`]);
  }

  editEmployee(id: string): void {
    this.router.navigate([`/employees/edit/${id}`]);
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees();
      });
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
