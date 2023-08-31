function cpfSplit(cpf) {
  if (typeof cpf === 'number') cpf = cpf.toString();
  cpf = cpf.replace('-', '');
  cpf = cpf.replaceAll('.', '');

  if (cpf.length !== 11) return false;
  return cpf.split('').map(Number);
}

function remainder(array, cpfSplitted) {
  let checksumDigit = 0;
  for (let index = 0; index < array.length; index++) {
    checksumDigit += (array[index] * cpfSplitted[index]);
  }
  const remainder = checksumDigit % 11;
  return remainder;
}

function returnVerifyingDigit(remainder) {
  let checkerDigit = 0;
  if (remainder < 2 || remainder === 11) checkerDigit = 0;
  else checkerDigit = 11 - remainder;
  return checkerDigit;
}

function invalidType(digit, cpfSplitted, index) {
  return digit !== cpfSplitted[index];
}

function cpfValid(cpf) {
  const arrayMultipliers = [10, 9, 8, 7, 6, 5, 4, 3, 2];
  const cpfSplitted = cpfSplit(cpf);
  if (!cpfSplitted) { return false; }

  const remainderOne = remainder(arrayMultipliers, cpfSplitted);
  let checkerDigitOne = returnVerifyingDigit(remainderOne);
  if (invalidType(checkerDigitOne, cpfSplitted, 9)) return false;

  arrayMultipliers.unshift(11);
  const remainderTwo = remainder(arrayMultipliers, cpfSplitted);
  let checkerDigitTwo = returnVerifyingDigit(remainderTwo);
  if (invalidType(checkerDigitTwo, cpfSplitted, 10)) return false;

  return true;
}


console.log(cpfValid('45916890850') === true);
console.log(cpfValid('45916890860') === false);
console.log(cpfValid('45916890851') === false);
console.log(cpfValid('61208239058') === true);
console.log(cpfValid('612.082.390-58') === true);
console.log(cpfValid('598.583.660-62') === false);
console.log(cpfValid(61208239058) === true);
console.log(cpfValid(456) === false);