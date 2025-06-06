export function validateName(name) {
  return name.trim().length >= 2;
}

export function validateAge(age) {
  return age >= 18 && age <= 99;
}

export function isNotEmpty(value) {
  return value?.trim() !== '';
}

export function validateDOB(date) {
  return date <= new Date();
}

export function validateEmail(email) {
  return email.includes('@');
}
