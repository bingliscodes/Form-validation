export default function Input({
  inputLabel,
  inputType,
  inputName,
  className,
  errorId,
}) {
  return (
    <label>
      {inputLabel}
      <input type={inputType} name={inputName} />
      <small className={className} id={errorId}></small>
    </label>
  );
}
