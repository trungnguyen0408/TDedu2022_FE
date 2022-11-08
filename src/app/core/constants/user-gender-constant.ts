export const UserGenderConstants = {
  MALE: 'Male',
  FEMALE: 'Female',
  UNKNOW: 'Unknow'
}

export class UserGender {
  static Genders: Array<{ text: string; value: string }> = [
    { text: UserGenderConstants.MALE, value: 'M' },
    { text: UserGenderConstants.FEMALE, value: 'F' },
    { text: UserGenderConstants.UNKNOW, value: 'U' },
  ];
}
