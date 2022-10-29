export const UserRoleConstants = {
  STUDENT: 'Student',
  LECTURER: 'Lecturer'
}

export class UserRole {
  static Roles: Array<{ text: string; value: string }> = [
    { text: UserRoleConstants.STUDENT, value: UserRoleConstants.STUDENT },
    { text: UserRoleConstants.LECTURER, value: UserRoleConstants.LECTURER },
  ];
}
