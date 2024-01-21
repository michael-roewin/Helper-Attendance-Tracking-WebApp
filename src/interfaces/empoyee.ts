import { User } from "./user";

export interface Employee {
  id: number;
  user: User;
  salary: string;
  dayOffPerMonth: number;
}