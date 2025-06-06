export default function Input({
  inputLabel,
  inputType,
  inputName,
  formState,
  errorId,
  ...props
}) {
  return (
    <label>
      {inputLabel}
      <input
        {...props}
        type={inputType}
        name={inputName}
        defaultValue={formState.enteredValues?.[inputName]}
      />
      {formState.errors?.[errorId] && (
        <small className="error" id={errorId}>
          <ul>
            {formState.errors[errorId].map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </small>
      )}
    </label>
  );
}
