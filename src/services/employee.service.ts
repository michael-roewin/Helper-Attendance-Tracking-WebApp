import axios, { AxiosResponse } from 'axios';
import { Employee } from '../interfaces/employee';
import { EmployeeCreateRequestDto } from '../dtos/employee-create-request.dto';
import { EmployeeSalaryReport } from '../interfaces/employee-salary-report';

const apiUrl = import.meta.env.VITE_API_URL + 'employees';

function getEmployee(employeeId: number): Promise<AxiosResponse<Employee>> {
  return axios.get<Employee>(`${apiUrl}/${employeeId}`);
}

function getEmployeeSalaryReport(employeeId: number): Promise<AxiosResponse<EmployeeSalaryReport>> {
  return axios.get<EmployeeSalaryReport>(`${apiUrl}/${employeeId}/salary-report`);
}

function getEmployees(): Promise<AxiosResponse<Employee[]>> {
  return axios.get<Employee[]>(`${apiUrl}`);
}

function createEmployee(employeeData: EmployeeCreateRequestDto): Promise<AxiosResponse<Employee>> {
  return axios.post<Employee>(`${apiUrl}`, employeeData);
}

function updateEmployee(employeeId: number, employeeData: EmployeeCreateRequestDto): Promise<AxiosResponse<Employee>> {
  return axios.put<Employee>(`${apiUrl}/${employeeId}`, employeeData);
}

function deleteEmployee(employeeId: number): Promise<AxiosResponse> {
  return axios.delete(`${apiUrl}/${employeeId}`);
}

export const EmployeeService = {
  getEmployee,
  getEmployeeSalaryReport,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
};