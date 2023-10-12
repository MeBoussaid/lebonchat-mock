import { useEffect, useState } from "react";
import Head from "next/head";

import style from "../styles/AllConversations.module.css";

import ConversationPreview from "../components/ui-components/ConversationPreview";

// amplify imports
import { Auth, withSSRContext, DataStore } from "aws-amplify";
import { serializeModel } from "@aws-amplify/datastore/ssr";
import { Conversation, User } from "../src/models";

// FIN - amplify imports

const AllConversations = (props) => {
  // states
  const [user, setUser] = useState(null);

  // check if user is Signed in
  useEffect(() => {
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
  }, []);
  // FIN - check if user is Signed in

  return (
    <>
      <Head>
        <title>Vos conversations</title>
        <meta name="description" content="Vos conversations sur lebonchat" />
      </Head>

      {props.conversations && (
        <main className="display-flex flex-center--horizontal flex-center--vertical  outer-padding ">
          {/* left div */}
          <div className={`${style.conversationsContainer} outer-padding `}>
            <>
              <h2 className="margin-bottom--10px">Vos conversations:</h2>

              {props.conversations.map((conversation) => (
                <div key={conversation.id}>
                  <ConversationPreview
                    interlocutorId={conversation.interlocutor}
                    conversationId={conversation.id}
                  />
                </div>
              ))}
            </>
          </div>
        </main>
      )}
    </>
  );
};

export default AllConversations;

export async function getServerSideProps({ req }) {
  // pour AWS amplify with SSR
  const SSR = withSSRContext({ req });

  let userId;
  let userName;
  let impossibleInterlocutors = [];
  try {
    const useData = await SSR.Auth.currentAuthenticatedUser();
    userId = useData.attributes.sub;
    userName = useData.username;
    impossibleInterlocutors.push(useData.attributes.sub);
  } catch {
    userId = "no User found";
    userName = "no User found";
  }

  let rowConversations;

  try {
    const conversationsData = await SSR.DataStore.query(Conversation, (c) =>
      c.or((c) => c.initiator("eq", `${userId}`).receiver("eq", `${userId}`))
    );
    rowConversations = conversationsData;
  } catch {
    rowConversations = "no conversations found";
  }

  let conversations = [];

  rowConversations.forEach((conversation) => {
    if (conversation.receiver === userId) {
      const cleanConversation = {
        id: conversation.id,
        title: conversation.title,
        interlocutor: conversation.initiator,
      };
      impossibleInterlocutors.push(conversation.initiator);
      conversations.push(cleanConversation);
    } else if (conversation.initiator === userId) {
      const cleanConversation = {
        id: conversation.id,
        title: conversation.title,
        interlocutor: conversation.receiver,
      };
      impossibleInterlocutors.push(conversation.receiver);
      conversations.push(cleanConversation);
    }
  });

  return {
    props: {
      userId: serializeModel(userId),
      userName: serializeModel(userName),
      conversations: serializeModel(conversations),
      impossibleInterlocutors: serializeModel(impossibleInterlocutors),
    },
  };
}
// FIN - Get ServerSide Props
