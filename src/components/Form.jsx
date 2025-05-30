import Header from './Header.jsx';
import { useActionState, useState } from 'react';
import {
  validateName,
  validateEmail,
  validateAge,
  isNotEmpty,
  validateDOB,
} from '../util/validation.js';

export default function Form() {
  const [experienceValue, setExperienceValue] = useState(5);

  function handleFormSubmit(prevFormState, formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const age = formData.get('age');
    const gender = formData.get('gender');
    const dateOfBirth = formData.get('dob');
    const experience = experienceValue;

    const errors = {};

    if (!validateName(name) || !isNotEmpty(name))
      errors.nameError = 'Name must be at least 2 characters';

    if (!validateEmail(email) || !isNotEmpty(email))
      errors.emailError = 'Please enter a valid email address';

    if (!validateAge(age) || !isNotEmpty(age))
      errors.ageError = 'Age must be a number between 18 and 99';

    if (!isNotEmpty(gender)) errors.genderError = 'Please select an option';

    if (!validateDOB(Date.parse(dateOfBirth)) || !isNotEmpty(dateOfBirth))
      errors.birthdayError = "Please select a birthday before today's date";

    if (Object.keys(errors).length > 0)
      return {
        errors,
        enteredValues: { name, email, age, gender, dateOfBirth, experience },
      };
    alert('Form submitted successfully!');
    setExperienceValue(5);
    return { errors: null };
  }

  const [formState, formAction, pending] = useActionState(handleFormSubmit, {
    errors: null,
  });

  function handleExperienceChange() {
    setExperienceValue(document.getElementById('experienceSlider').value);
  }

  return (
    <div className="form-container">
      <Header />
      <form id="infoForm" action={formAction}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            defaultValue={formState.enteredValues?.name}
          />
          {formState.errors?.nameError && (
            <small className="error" id="nameError">
              {formState.errors?.nameError}
            </small>
          )}
        </label>

        <label>
          Email:
          <input
            type="text"
            name="email"
            defaultValue={formState.enteredValues?.email}
          />
          {formState.errors?.emailError && (
            <small className="error" id="emailError">
              {formState.errors.emailError}
            </small>
          )}
        </label>

        <label>
          Age:
          <input
            type="number"
            name="age"
            defaultValue={formState.enteredValues?.age}
          />
          {formState.errors?.ageError && (
            <small className="error" id="emailError">
              {formState.errors.ageError}
            </small>
          )}
        </label>

        <label>
          Gender:
          <select name="gender">
            <option value="">
              {formState.enteredValues?.gender || '--Select Gender --'}
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {formState.errors?.genderError && (
            <small className="error" id="emailError">
              {formState.errors.genderError}
            </small>
          )}
        </label>

        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            defaultValue={formState.enteredValues?.dateOfBirth}
          />
          {formState.errors?.birthdayError && (
            <small className="error" id="emailError">
              {formState.errors.birthdayError}
            </small>
          )}
        </label>

        <label>
          Experience Level (1-10):
          <input
            type="range"
            id="experienceSlider"
            name="experience"
            defaultValue={experienceValue}
            min="1"
            max="10"
            onChange={handleExperienceChange}
          />
          <span id="experienceValue">{experienceValue}</span>
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
}
