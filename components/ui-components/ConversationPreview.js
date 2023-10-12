import { useEffect, useState } from "react";
import Link from "next/link";

import style from "./ConversationPreview.module.css";

import Card from "../styling-components/Card";
import Avatar from "./Avatar";
import LoadingSpinner from "../styling-components/LoadingSpinner";

// amplify imports
import { DataStore } from "aws-amplify";
import { User } from "../../src/models";
// FIN - amplify imports

const ConversationPreview = (props) => {
  const [interlocutor, setInterlocutor] = useState(null);
  useEffect(() => {
    loadInterlocutor();
    async function loadInterlocutor() {
      try {
        const [interlocutorData] = await DataStore.query(User, (c) =>
          c.id("eq", `${props.interlocutorId}`)
        );
        setInterlocutor(interlocutorData);
      } catch {
        setInterlocutor(null);
      }
    }
  }, [props.interlocutorId]);

  return (
    <>
      {/* place holder si conversation preview charge */}
      {!interlocutor && (
        <Card
          CardWidth="100%"
          CardHeight="60px"
          StyleViaProps=" padding-all--5px display-flex flex-center--vertical margin-bottom--5px"
        >
          <Avatar />
          <div className={`${style.senderName} text-overflow--dots boldText`}>
            <LoadingSpinner />
          </div>
        </Card>
      )}
      {/* Fin -  place holder si conversation preview charge */}

      {interlocutor && (
        <Link
          href={`/conversation/${props.conversationId}`}
          key={props.conversationId}
        >
          <a>
            <Card
              CardWidth="100%"
              CardHeight="60px"
              StyleViaProps=" padding-all--5px display-flex flex-center--vertical margin-bottom--5px"
            >
              <Avatar image={interlocutor.avatar} />
              <div className="display-flex flex-direction--column padding-all--5px">
                <div
                  className={`${style.senderName} text-overflow--dots boldText`}
                >
                  {interlocutor.name}
                </div>
              </div>
            </Card>
          </a>
        </Link>
      )}
    </>
  );
};

export default ConversationPreview;
