import { EmployeeLeaveType } from "../enums/employee-leave-type";
import { EmployeeLeaveItem } from "../interfaces/employee-leave-item";

export interface EmployeeLeaveUpdateRequestDto {
  startDate: string;

  endDate: string;

  type: EmployeeLeaveType;

  reason: string;

  items: EmployeeLeaveItem[];
}