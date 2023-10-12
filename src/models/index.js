// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Message, User, Conversation } = initSchema(schema);

export {
  Message,
  User,
  Conversation
};