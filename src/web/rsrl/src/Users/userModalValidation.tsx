const multipliers = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
const digitsConst = "0123456789";

export function isPeselValid(pesel: string): boolean {
  let chars = pesel.split("");
  if (pesel.length !== 11 || chars.filter(c => !digitsConst.includes(c)).length !== 0) {
    return false;
  }
  let digits = chars.map(c => parseInt(c));

  let sum = 0;
  for (let i = 0; i < digits.length - 1; ++i) {
    sum += digits[i] * multipliers[i];
  }
  let mod = sum % 10;

  return 10 - mod === digits[10] || digits[10] === mod;
}
