export const UserStatusConstants = {
  Active: 'Active',
  Inactive: 'Inactive',
  Banned: 'Banned'
}

export class UserStatus {
  static Status: Array<{ text: string; value: string }> = [
    { text: UserStatusConstants.Active, value: UserStatusConstants.Active },
    { text: UserStatusConstants.Inactive, value: UserStatusConstants.Inactive },
    { text: UserStatusConstants.Banned, value: UserStatusConstants.Banned },
  ];
}
