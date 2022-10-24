export const UserRoleConstants = {
  Student: 'Student',
  Lecturer: 'Lecturer'
}

export class UserRole {
  static Status: Array<{ text: string; value: string }> = [
    { text: UserRoleConstants.Student, value: UserRoleConstants.Student },
    { text: UserRoleConstants.Lecturer, value: UserRoleConstants.Lecturer },
  ];
}
