export const UserDurationConstants = {
  FIVE_MINUTES: '5 minutes',
  TEN_MINUTES: '10 minutes',
  FIFTEEN_TEEN_MINUTES: '15 minutes',
  THIRTY_MINUTES: '30 minutes',
  HOUR : '1 hours',
  UNTIL_UPDATE: 'Until updated'
}

export class UserDuration {
  static Durations: Array<{ text: string; value: string }> = [
    { text: UserDurationConstants.FIVE_MINUTES, value: '5m' },
    { text: UserDurationConstants.TEN_MINUTES, value: '10m' },
    { text: UserDurationConstants.FIFTEEN_TEEN_MINUTES, value: '15m' },
    { text: UserDurationConstants.THIRTY_MINUTES, value: '30m' },
    { text: UserDurationConstants.HOUR, value: '1hours' },
    { text: UserDurationConstants.UNTIL_UPDATE, value: 'until_update' },
  ];
}
