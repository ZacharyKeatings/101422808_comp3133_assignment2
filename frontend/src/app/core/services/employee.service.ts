import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_ALL_EMPLOYEES,
  GET_EMPLOYEE_BY_ID,
  SEARCH_EMPLOYEE
} from '../graphql/queries';
import {
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE
} from '../graphql/mutations';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getAllEmployees() {
    return this.apollo.watchQuery({ query: GET_ALL_EMPLOYEES }).valueChanges;
  }

  getEmployeeById(id: string) {
    return this.apollo.watchQuery({
      query: GET_EMPLOYEE_BY_ID,
      variables: { id }
    }).valueChanges;
  }

  searchEmployees(department: string, designation: string) {
    return this.apollo.watchQuery({
      query: SEARCH_EMPLOYEE,
      variables: { department, designation }
    }).valueChanges;
  }

  addEmployee(data: any) {
    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: data,
      refetchQueries: [{ query: GET_ALL_EMPLOYEES }]
    });
  }

  updateEmployee(id: string, updates: any) {
    return this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: { id, ...updates },
      refetchQueries: [{ query: GET_ALL_EMPLOYEES }]
    });
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { id },
      refetchQueries: [{ query: GET_ALL_EMPLOYEES }]
    });
  }
}
