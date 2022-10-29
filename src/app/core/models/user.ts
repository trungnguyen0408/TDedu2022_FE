import { Gender } from "../enums/gender";

export class User {
  full_name: string = '';
  userName: string = '';
  email: string = '';
  mobile_phone: string = '';
  gender: Gender = Gender.unknow;
  password: string = '';
  password_confirmation: string = '';
  day_of_birth: string = '';
}
