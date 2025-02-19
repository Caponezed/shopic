import { User } from "./user.model";

export interface LoginResponseDto {
  user: User;
  jwtToken: string;
}
