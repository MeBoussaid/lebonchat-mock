import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Head from "next/head";

import style from "./id.module.css";

import Button from "../../components/ui-components/Button";
import MessageBubble from "../../components/ui-components/MessageBubble";
import LoadingSpinner from "../../components/styling-components/LoadingSpinner";

// amplify imports
import { Auth, DataStore, withSSRContext } from "aws-amplify";
import { User, Message, Conversation } from "../../src/models";
// FIN - amplify imports

// Formik et Yup
import { useFormik } from "formik";
import * as Yup from "yup";
// FIN - Formik et Yup

const OneConversation = (props) => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState(null);

  const sendMessageHandler = async (message) => {
    try {
      await DataStore.save(
        new Message({
          content: message,
          sender: user.attributes.sub,
          conversationID: props.id,
        })
      );
    } catch {
      console.debug("error : message not saved");
    }
  };
  // pour valider Message textarea
  const formik = useFormik({
    initialValues: {
      messageToSend: "",
    },

    validationSchema: Yup.object({
      messageToSend: Yup.string()
        .max(
          300,
          "Un message de plus de 300 caractères doit être envoyé par voie postale 📮 "
        )
        .required("Un message vide ?! Why ? 🥸"),
    }),

    onSubmit: (values, { resetForm }) => {
      sendMessageHandler(values.messageToSend);
      resetForm({ values: "" });
    },
  });
  //FIN -  pour valider Message textarea

  const router = useRouter();

  useEffect(() => {
    // check if user is Signed in
    checkUser();
    async function checkUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch {
        setUser(null);
        window.location = "/";
      }
    }
    // FIN - check if user is Signed in

    // get Messages
    getMessages();

    async function getMessages() {
      try {
        const messages = await DataStore.query(Message, (c) =>
          c.conversationID("eq", `${router.query.id}`)
        );
        setMessages(messages.reverse());
      } catch {
        setMessages("No messages found");
      }
    }

    const subscription = DataStore.observe(Message).subscribe(() =>
      getMessages()
    );
    return () => subscription.unsubscribe();
  }, [router.query.id]);

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <Head>
        <title>Chat avec {capitalize(props.interlocutorName)}</title>
        <meta name="description" content="Une conversation" />
      </Head>

      {messages === null ? (
        <main className="display-flex flex-center--horizontal flex-center--vertical  outer-padding ">
          <LoadingSpinner />
        </main>
      ) : (
        <main className="display-flex flex-center--horizontal flex-center--vertical  outer-padding ">
          <div className={`${style.conversationsContainer} outer-padding `}>
            <div className={`${style.messagesContainer} `}>
              {messages.map((message) => {
                if (message.sender === user.attributes.sub) {
                  return (
                    <MessageBubble
                      messageType={"sent"}
                      messageContent={message.content}
                    />
                  );
                } else if (message.sender != user.attributes.sub) {
                  return (
                    <MessageBubble
                      messageType={"received"}
                      messageContent={message.content}
                      messageSender={message.sender}
                    />
                  );
                }
              })}
            </div>

            {/* TextArea */}
            <form onSubmit={formik.handleSubmit}>
              <textarea
                className={`${
                  style.messageTextarea
                } outer-padding width-100--100 {
                  ${
                    formik.touched.messageToSend &&
                    formik.errors.messageToSend &&
                    "textAreaErrorfield"
                  }`}
                placeholder="Saisissez votre message"
                id="messageToSend"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.messageToSend}
              />
              <div className="textarea-error margin-bottom--5px">
                {formik.touched.messageToSend && formik.errors.messageToSend}
              </div>
              <Button BtnPrototype={"primary"} Type={"submit"}>
                Envoyer message
              </Button>
            </form>
            {/* FIN - TextArea */}
          </div>
        </main>
      )}
    </>
  );
};

export default OneConversation;

export async function getServerSideProps(context, req) {
  // pour AWS amplify with SSR
  const SSR = withSSRContext(req);
  const { params } = context;
  const conversationId = params.id;

  let currentUser;
  let conversationData;
  let interlocutorId;
  let interlocutorName;

  try {
    const rowConversationData = await SSR.DataStore.query(
      Conversation,
      conversationId
    );
    conversationData = rowConversationData;

    if (conversationData.receiver != currentUser) {
      interlocutorId = conversationData.initiator;
    } else if (conversationData.initiator != currentUser) {
      interlocutorId = conversationData.receiver;
    }
  } catch {}

  try {
    const interlocutorData = await SSR.DataStore.query(User, interlocutorId);
    interlocutorName = interlocutorData.name;
  } catch {}

  return {
    props: {
      id: conversationId,
      initiator: conversationData.initiator,
      receiver: conversationData.receiver,
      interlocutorName: interlocutorName,
    },
  };
}
