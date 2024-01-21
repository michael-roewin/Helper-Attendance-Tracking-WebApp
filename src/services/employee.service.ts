import axios, { AxiosResponse } from 'axios';
import { Employee } from '../interfaces/empoyee';
import { EmployeeCreateRequestDto } from '../dtos/employee-create-request.dto';

const apiUrl = import.meta.env.VITE_API_URL + 'employees';

function getEmployee(employeeId: number): Promise<AxiosResponse<Employee>> {
  return axios.get<Employee>(`${apiUrl}/${employeeId}`);
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
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
};