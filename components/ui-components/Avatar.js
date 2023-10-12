import style from "./Avatar.module.css";

const Avatar = (props) => {
  return <img src={props.image} className={`${style.avatar} `} />;
};

export default Avatar;
