import style from "./Input.module.css";

function Input(props) {
  return (
    <div
      className={`${style.inputGroup} display-flex 
    flex-direction--column `}
    >
      <label
        htmlFor={props.Id}
        className={`${props.LabelStyleViaProps || " "} ${style.label} `}
      >
        {props.LabelText}
      </label>
      <input
        id={props.Id}
        name={props.Name || " "}
        type={props.Type}
        placeholder={props.Placeholder || " "}
        className={`${props.InputStyleViaProps || " "} ${style.inputField} ${
          props.IfError && style.inputErrorStyle
        }`}
        content={props.Content}
        onChange={props.OnChange || null}
        value={props.Value || ""}
      />
      <div className={`${style.inputErrorMessage} d-f f-d--c`}>
        {props.IfError || " "}
      </div>
    </div>
  );
}
export default Input;
