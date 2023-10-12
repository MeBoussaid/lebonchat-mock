import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import style from "./Header.module.css";
import ThemeContext from "../../store/context/theme-context";
import Logo from "../styling-components/Logo";
import Avatar from "../ui-components/Avatar";
import Button from "./../ui-components/Button";
import LoadingSpinner from "../styling-components/LoadingSpinner";

// for Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke, faSun } from "@fortawesome/free-solid-svg-icons";
// FIN - for Font Awesome

// amplify imports
import { Auth, DataStore } from "aws-amplify";
import { User } from "../../src/models";
// FIN - amplify imports

const Header = (props) => {
  const themeContexte = useContext(ThemeContext);
  const { asPath } = useRouter();
  const [isWaitingForSignOut, setIsWaitingForSignOut] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [userName, setUserName] = useState(" ");

  useEffect(() => {
    checkAuthenticatedUser();
    async function checkAuthenticatedUser() {
      try {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        setCurrentUser(authenticatedUser);
        const [userData] = await DataStore.query(User, (c) =>
          c.id("eq", `${authenticatedUser.attributes.sub}`)
        );

        setAvatar(userData.avatar);
        setUserName(userData.name);
      } catch {
        setCurrentUser(null);
        setAvatar(" ");
        setUserName(" ");
      }
    }
  }, []);

  async function signOutHandler() {
    try {
      await Auth.signOut();
      setIsWaitingForSignOut(true);
      window.location = "/";
      setCurrentUser(null);
    } catch (error) {}
  }

  return (
    <header
      className={`${style.header} outer-padding display-flex flex-space-between--horizontal flex-center--vertical `}
    >
      {isWaitingForSignOut && <LoadingSpinner />}
      {!avatar && asPath !== "/" && <LoadingSpinner />}
      {asPath === "/" && <Logo />}
      {currentUser && avatar && asPath !== "/" && (
        <Link href={"/AllConversations"}>
          <a
            title="Retourner à mes conversations"
            className="display-flex flex-center--vertical"
          >
            <Avatar image={avatar} />
            <div className=" margin-left--5px smallText link-simple">
              Bonjour <br /> <span className="capitalize">{userName}</span>
            </div>
          </a>
        </Link>
      )}
      <div className="display-flex flex-center--vertical">
        {currentUser && (
          <div className="margin-right--15px">
            <Button BtnPrototype={"secondary"} OnClick={signOutHandler}>
              Se déconnecter
            </Button>
          </div>
        )}

        {themeContexte.theme === "light" && (
          <FontAwesomeIcon
            icon={faCircleHalfStroke}
            className=" m-l--10 pointer icon-button"
            title="Mode sombre"
            onClick={() => {
              themeContexte.setDarkTheme();
            }}
          />
        )}
        {themeContexte.theme === "dark" && (
          <FontAwesomeIcon
            icon={faSun}
            className=" m-l--10 pointer icon-button"
            title="Mode clair"
            onClick={themeContexte.setLightTheme}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
