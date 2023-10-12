import { useContext } from "react";
import ThemeContext from "../../store/context/theme-context";

import Header from "./Header";
import Footer from "./Footer";

const Body = (props) => {
  const themeContext = useContext(ThemeContext);

  return (
    <div className="body" data-theme={themeContext.theme}>
      <Header />

      {props.children}
      <Footer />
    </div>
  );
};

export default Body;
