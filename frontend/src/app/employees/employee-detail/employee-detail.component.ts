import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';

import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
  providers: [CurrencyPipe, DatePipe],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class EmployeeDetailComponent implements OnInit {
  employee: any = null;
  employeeId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe((res: any) => {
        this.employee = res.data.getEmployeeById;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
