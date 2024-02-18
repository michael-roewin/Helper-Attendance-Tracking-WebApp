import { EmployeeLeaveType } from "../enums/employee-leave-type";
import { EmployeeLeaveItem } from "./employee-leave-item";
import { Employee } from "./employee";

export interface EmployeeLeave {
  id: number;

  employee?: Employee;

  startDate: Date;

  endDate: Date;

  numDays: number;

  type: EmployeeLeaveType;

  reason: string;

  items: EmployeeLeaveItem[]
}