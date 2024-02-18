import { EmployeeLeaveItemType } from "../enums/employee-leave-item-type";
import { EmployeeLeave } from "./employee-leave";

export interface EmployeeLeaveItem {
  id?: number;

  employeeLeave?: EmployeeLeave;

  date: Date;

  type: EmployeeLeaveItemType
}