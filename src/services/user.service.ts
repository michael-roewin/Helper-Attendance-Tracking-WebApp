import axios, { AxiosResponse } from "axios";
import { User } from "../interfaces/user";
import { UserCreateRequestDto } from "../dtos/user-create-request.dto";

const apiUrl = import.meta.env.VITE_API_URL + 'users';

function getUser(userId: number): Promise<AxiosResponse<User>> {
  return axios.get<User>(`${apiUrl}/${userId}`);
}

function getUsers(): Promise<AxiosResponse<User[]>> {
  return axios.get<User[]>(`${apiUrl}`);
}

function createUser(userData: UserCreateRequestDto): Promise<AxiosResponse<User>> {
  return axios.post<User>(`${apiUrl}`, userData);
}

function updateUser(userId: number, userData: UserCreateRequestDto): Promise<AxiosResponse<User>> {
  return axios.put<User>(`${apiUrl}/${userId}`, userData);
}

function deleteUser(userId: number): Promise<AxiosResponse> {
  return axios.delete(`${apiUrl}/${userId}`);
}

export const UserService = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
};