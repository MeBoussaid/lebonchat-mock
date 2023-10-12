import "../styles/globals.css";
import Body from "../components/structural-components/Body";

import { ThemeContextProvider } from "../store/context/theme-context";

// specific to Font Awesome in Next.js
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
// specific to Font Awesome in Next.

// Config Amplify in next
import "../ConfigAmplify";
// FIN - amplify imports

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <Body>
        <Component {...pageProps} />
      </Body>
    </ThemeContextProvider>
  );
}

export default MyApp;
