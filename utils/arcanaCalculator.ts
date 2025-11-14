
import { MAJOR_ARCANA } from '../constants';
import { TarotCard } from '../types';

export const calculateBirthArcana = (dob: string): TarotCard | null => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    return null; // Invalid date format
  }

  const digits = dob.replace(/-/g, '').split('').map(Number);
  let sum = digits.reduce((acc, digit) => acc + digit, 0);

  while (sum > 21) {
    if (sum === 22) { // Special case for The Fool
      sum = 0;
      break;
    }
    sum = String(sum).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }

  if (sum >= 0 && sum < MAJOR_ARCANA.length) {
    return MAJOR_ARCANA[sum];
  }

  return null;
};
