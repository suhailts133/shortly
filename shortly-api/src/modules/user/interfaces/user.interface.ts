export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
}

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
}