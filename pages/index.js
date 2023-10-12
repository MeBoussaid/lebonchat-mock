import { useState, useEffect } from "react";

import Head from "next/head";
import style from "../styles/Index.module.css";

import Button from "../components/ui-components/Button";
import Input from "../components/ui-components/Input";
import Card from "../components/styling-components/Card";
import LoadingSpinner from "../components/styling-components/LoadingSpinner";

// amplify imports
import { Auth } from "aws-amplify";
// FIN - amplify imports

// Valider les inputs en front
import { useFormik } from "formik";
import * as Yup from "yup";
// FIn - Valider les inputs en front

export default function Index() {
  const [authenticationError, setAuthenticationError] = useState(false);
  // fonction pour se connecter

  // pout créer un user
  async function signIn(username, password) {
    try {
      const user = await Auth.signIn(username, password);
      window.location = "/AllConversations";
    } catch (error) {
      setIsWaitingForSignIn(false);
      setAuthenticationError(true);
      setIsLogged(false);
    }
  }

  // FIN - fonction pour se connecter

  const [testUsers, setTestUsers] = useState(false);
  const toggleTestUsersDiv = () => {
    setTestUsers(!testUsers);
  };

  // waiting for logging ...
  const [isWaitingForSignIn, setIsWaitingForSignIn] = useState(false);
  //FIN - waiting for logging ...

  // is logged state
  const [isLogged, setIsLogged] = useState(true);
  // FIN - is logged state

  // check si user is logged
  useEffect(() => {
    async function checkUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setIsLogged(true);
        window.location = "/AllConversations";
      } catch {
        setIsLogged(false);
      }
    }
    checkUser();
  }, []);

  // Input validation
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Nom d'utilisateur requis"),
      password: Yup.string()
        .min(8, "Mot de passe doit être de 8 caractères ou plus ")
        .max(15, "Mot de passe ne doit pas dépasser 15 caractères")
        .required("Mot de passe requis"),
    }),
    onSubmit: async (values) => {
      setIsWaitingForSignIn(true);
      const username = values.username;
      const password = values.password;
      signIn(username, password);
    },
  });
  // FIN - Input validation

  return (
    <>
      <Head>
        <title>lebonchat - Se connecter</title>
        <meta name="description" content="lebonchat test app By Elie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* le temps de voir si user is logged */}
      {isLogged && (
        <main className="display-flex flex-center--horizontal flex-center--vertical  outer-padding height-70--vh">
          <LoadingSpinner />
        </main>
      )}
      {/* FIN - le temps de voir si user is logged */}

      {!isLogged && (
        <main className="display-flex flex-center--horizontal flex-center--vertical  outer-padding height-70--vh">
          <div className={`${style.authCardContainer}`}>
            {/* authentication error div */}
            {authenticationError && (
              <div className="pointer link-simple outer-padding textCenter width-100 margin-top--10px error-text">
                <span>
                  Erreur de connexion : vérifier vos identifiants et réessayer
                </span>
              </div>
            )}
            {/* FIN - authentication error div */}

            <Card CardWidth="100%" StyleViaProps="outer-padding">
              <h1 className="margin-bottom--10px"> Se Connecter</h1>
              <form
                className="display-flex 
              flex-direction--column "
                onSubmit={formik.handleSubmit}
              >
                <Input
                  LabelStyleViaProps={""}
                  InputStyleViaProps={""}
                  Id={"username"}
                  LabelText={"Votre nom d'utilisateur:"}
                  Name={"username"}
                  Type={"text"}
                  Placeholder={"Nom d'utilisateur"}
                  OnChange={formik.handleChange}
                  Value={formik.values.username}
                  IfError={formik.touched.username && formik.errors.username}
                />

                <Input
                  LabelStyleViaProps={""}
                  InputStyleViaProps={""}
                  Id={"mot de passe"}
                  LabelText={"Votre mot de passe:"}
                  Name={"password"}
                  Type={"password"}
                  Placeholder={"************"}
                  OnChange={formik.handleChange}
                  Value={formik.values.password}
                  IfError={formik.touched.password && formik.errors.password}
                />

                <Button BtnPrototype={"primary"} Type={"submit"}>
                  {" "}
                  {!isWaitingForSignIn && "Se Connecter"}
                  {isWaitingForSignIn && <LoadingSpinner />}
                </Button>
              </form>
            </Card>

            <div className="pointer link-simple outer-padding textCenter width-100 margin-top--10px">
              {!testUsers && (
                <span onClick={toggleTestUsersDiv}>
                  🛟 Afficher les utilisateurs de test ? 🛟
                </span>
              )}

              {testUsers && (
                <span onClick={toggleTestUsersDiv}>
                  🛟 Cacher les utilisateurs de test ? 🛟
                </span>
              )}
            </div>

            {testUsers && (
              <div className="pointer link-simple outer-padding textCenter width-100 ">
                <a
                  className="link-without--decoration link-simple textCenter "
                  href="https://github.com/MeBoussaid/lebonchat-v2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check repo ➡️ README
                </a>
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
}

// async function signUp() {
//   try {
//     const { user } = await Auth.signUp({
//       username: "julia",
//       password: "e123456789",
//       attributes: {
//         email: "julia@mail.com", // optional
//       },
//     });
//     console.log(user);
//   } catch (error) {
//     console.log("error signing up:", error);
//   }
// }

// pour valider un user
// async function updateUserAttributes(username) {
//   try {
//     const result = await Auth.adminUpdateUserAttributes(username, {
//       "cognito:user_status": "CONFIRMED",
//     });
//     console.log("User attributes updated:", result);
//   } catch (error) {
//     console.error("Failed to update user attributes:", error);
//   }
// }

// await updateUserAttributes(user.username);

{
  /* <button
  onClick={() => {
    console.log("click");
    signUp();
  }}
>
  sing up
</button>; */
}
