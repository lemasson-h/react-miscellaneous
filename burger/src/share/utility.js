export const checkValidity = (value, rules) => {
  if (rules.required && value.trim() === '') {
      return 'You must specify a value.';
  }

  if (rules.minLength && value.length < rules.minLength) {
    return 'You must enter a value of at least ' + rules.minLength + ' characters';
  }

  if (rules.maxLength && value.length > rules.maxLength) {
      return 'You must enter a value of at maximum ' + rules.minLength + ' characters';
  }

  if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if (!pattern.test(value)) {
        return 'Invalid email';
      }
  }

  return '';
}
