export const UserGenderConstants = {
  MALE: 'Male',
  FEMALE: 'Female',
  UNKNOW: 'Unknow'
}

export class UserGender {
  static Genders: Array<{ text: string; value: string }> = [
    { text: UserGenderConstants.MALE, value: UserGenderConstants.MALE },
    { text: UserGenderConstants.FEMALE, value: UserGenderConstants.FEMALE },
    { text: UserGenderConstants.UNKNOW, value: UserGenderConstants.UNKNOW },
  ];
}
