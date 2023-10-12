import style from "./Footer.module.css";
import Logo from "../styling-components/Logo";

const Footer = () => {
  return (
    <footer
      className={`display-flex  flex-direction--column flex-center--horizontal flex-center--vertical ${style.footer} `}
    >
      <div
        className={` outer-padding display-flex display-flex flex-center--horizontal flex-center--vertical  `}
      >
        <Logo />
      </div>
      <div className={` outer-padding  `}>
        <sup className="etoile">*</sup> Not the 😸, it is the 💬
      </div>
    </footer>
  );
};

export default Footer;
