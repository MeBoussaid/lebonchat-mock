import style from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <span>
      <div className={style.loadingSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </span>
  );
};

export default LoadingSpinner;
