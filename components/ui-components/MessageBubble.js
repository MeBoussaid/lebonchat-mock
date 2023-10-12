import { useEffect, useState } from "react";

import style from "./MessageBubble.module.css";

import Card from "../styling-components/Card";

// amplify imports
import { DataStore } from "aws-amplify";
import { User } from "../../src/models";
// FIN - amplify imports

const MessageBubble = (props) => {
  const [interlocutor, setInterlocutor] = useState(null);
  useEffect(() => {
    getSenderData();
    async function getSenderData() {
      try {
        const [interlocutorData] = await DataStore.query(User, (c) =>
          c.id("eq", props.messageSender)
        );
        setInterlocutor(interlocutorData);
      } catch {
        console.debug("no user found");
      }
    }
  }, [props.messageSender]);

  if (props.messageType === "received") {
    return (
      <div className={`${style.messageSentContainer}`}>
        <div className={`${style.messageCard}`}>
          <Card
            StyleViaProps=" padding-all--5px display-flex flex-center--vertical margin-bottom--10px "
            NoShadow
          >
            <div className={`${style.messageText}`}>
              {props.messageContent}
              {!interlocutor && " "}
              {interlocutor && (
                <div className={`${style.senderName} capitalize`}>
                  {interlocutor.name}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  } else if (props.messageType === "sent") {
    return (
      <div className={`${style.messageReceivedContainer}`}>
        <div className={`${style.messageCard}`}>
          <Card
            StyleViaProps=" padding-all--5px display-flex flex-center--vertical margin-bottom--10px "
            NoShadow
          >
            <div className={`${style.messageText} `}>
              {props.messageContent}
              <div className={`${style.senderName}`}>Vous</div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
};

export default MessageBubble;
