export interface UserUpdateRequestDto {
  firstName: string;

  lastName: string;

  username: string;

  password?: string;

  cpassword?: string;

  active?: boolean;

  salary: string;

  dayOffPerMonth: number;
}