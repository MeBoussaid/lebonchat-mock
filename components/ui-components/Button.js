import style from "./Button.module.css";

function Button(props) {
  if (props.BtnPrototype === "primary") {
    return (
      <button
        className={`${style.btn} ${style.primary} ${
          props.StyleViaProps || " "
        } `}
        type={props.Type || "button"}
        onClick={props.OnClick || null}
      >
        {props.children}
      </button>
    );
  } else if (props.BtnPrototype === "secondary") {
    return (
      <button
        className={`${style.btn} ${style.secondary} ${
          props.StyleViaProps || " "
        } `}
        type={props.Type || "button"}
        onClick={props.OnClick || null}
      >
        {props.children}
      </button>
    );
  }
}

export default Button;
