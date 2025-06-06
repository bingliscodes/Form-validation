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
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
