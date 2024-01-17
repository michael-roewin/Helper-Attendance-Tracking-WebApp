import axios, { AxiosResponse } from "axios";
import { User } from "../interfaces/user";

const apiUrl = import.meta.env.VITE_API_URL + 'users';

function getUser(userId: number): Promise<AxiosResponse<User>> {
  return axios.get<User>(`${apiUrl}/${userId}`);
}

function getUsers(): Promise<AxiosResponse<User[]>> {
  return axios.get<User[]>(`${apiUrl}`);
}

export const UserService = {
  getUser,
  getUsers
};