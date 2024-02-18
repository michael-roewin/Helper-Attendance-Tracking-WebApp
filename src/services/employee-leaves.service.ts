import axios, { AxiosResponse } from 'axios';
import { EmployeeLeave } from '../interfaces/employee-leave';
import { EmployeeLeaveCreateRequestDto } from '../dtos/employee-leave-create-request.dto';
import { EmployeeLeaveUpdateRequestDto } from '../dtos/employee-leave-update-request.dto';
import { EmployeeLeaveType } from '../enums/employee-leave-type';

const apiUrl = import.meta.env.VITE_API_URL + 'employees';

function getEmployeeLeave(employeeId: number, employeeLeaveId: number): Promise<AxiosResponse<EmployeeLeave>> {
  return axios.get<EmployeeLeave>(`${apiUrl}/${employeeId}/leaves/${employeeLeaveId}`);
}

function getEmployeeLeaves(employeeId: number, type?: EmployeeLeaveType): Promise<AxiosResponse<EmployeeLeave[]>> {
  return axios.get<EmployeeLeave[]>(`${apiUrl}/${employeeId}/leaves${type ? `?type=${type}`: ''}`);
}

function createEmployeeLeave(employeeId: number, employeeLeaveData: EmployeeLeaveCreateRequestDto): Promise<AxiosResponse<EmployeeLeave>> {
  return axios.post<EmployeeLeave>(`${apiUrl}/${employeeId}/leaves`, employeeLeaveData);
}

function updateEmployeeLeave(employeeId: number, employeeLeaveId: number, employeeLeaveData: EmployeeLeaveUpdateRequestDto): Promise<AxiosResponse<EmployeeLeave>> {
  return axios.put<EmployeeLeave>(`${apiUrl}/${employeeId}/leaves/${employeeLeaveId}`, employeeLeaveData);
}

function deleteEmployeeLeave(employeeId: number, employeeLeaveId: number): Promise<AxiosResponse> {
  return axios.delete(`${apiUrl}/${employeeId}/leaves/${employeeLeaveId}`);
}

export const EmployeeLeaveService = {
  getEmployeeLeave,
  getEmployeeLeaves,
  createEmployeeLeave,
  updateEmployeeLeave,
  deleteEmployeeLeave
};