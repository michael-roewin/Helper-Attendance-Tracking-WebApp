export interface UserCreateRequestDto {
  firstName: string;

  lastName: string;

  username: string;

  password: string;

  cpassword: string;

  active?: boolean;
}