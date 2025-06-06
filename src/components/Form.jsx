import Header from './Header.jsx';
import Input from './Input.jsx';
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
    const dateOfBirth = formData.get('dateOfBirth');
    const experience = experienceValue;

    const errors = {};
    errors.nameError = [];
    errors.emailError = [];
    errors.ageError = [];
    errors.birthdayError = [];
    errors.genderError = [];

    if (!isNotEmpty(name)) errors.nameError.push('Name is a required field.');
    if (!validateName(name))
      errors.nameError.push('Name must be at least 2 characters');

    if (!isNotEmpty(email))
      errors.emailError.push('Email is a required field.');
    if (!validateEmail(email))
      errors.emailError.push('Please enter a valid email address');

    if (!isNotEmpty(age)) errors.ageError.push('Age is a required field.');
    if (!validateAge(age))
      errors.ageError.push('Age must be a number between 18 and 99');

    if (!isNotEmpty(dateOfBirth))
      errors.birthdayError.push('Birthday is a required field.');

    if (!validateDOB(Date.parse(dateOfBirth)))
      errors.birthdayError.push("Please select a birthday before today's date");

    if (!isNotEmpty(gender))
      errors.genderError.push(
        'Gender is a required field. Please select an option.'
      );

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
        <Input
          inputLabel="Name"
          inputName="name"
          inputType="text"
          formState={formState}
          errorId="nameError"
        />
        <Input
          inputLabel="Email"
          inputName="email"
          inputType="text"
          formState={formState}
          errorId="emailError"
        />
        <Input
          inputLabel="Age"
          inputName="age"
          inputType="number"
          formState={formState}
          errorId="ageError"
        />

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
            <small className="error" id="genderError">
              {formState.errors.genderError}
            </small>
          )}
        </label>

        <Input
          inputLabel="Date of Birth"
          inputName="dateOfBirth"
          inputType="date"
          formState={formState}
          errorId="birthdayError"
        />

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
          <span>{experienceValue}</span>
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
}
