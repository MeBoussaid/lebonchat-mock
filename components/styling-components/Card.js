import style from "./Card.module.css";

function Card(props) {
  const cardHover = props.CardHover ? s.cardHover : null;
  return (
    <div
      className={` ${style.card}  ${cardHover} ${props.StyleViaProps}  ${
        props.NoShadow && style.cardWithoutShadow
      }`}
      style={{
        width: `${props.CardWidth} `,
        height: `${props.CardHeight}`,
      }}
    >
      {props.children}
    </div>
  );
}

export default Card;
