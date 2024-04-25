import url from "url";
import { defineWrappedResponseHandler } from "../utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const connection = event.context.mysql;

  // Récupération des messages d'un sujet
  const parsedUrl = url.parse(event._path, true);
  const query = parsedUrl.query;
  let sql = `SELECT messages.id, messages.contenu, messages.date_crea, messages.date_modif, messages.citation_id, sujets.id as subject_id, sujets.isClosed, forum_id, users.id as user_id, users.login FROM messages 
        JOIN users ON messages.author_id = users.id JOIN sujets on sujets.id = messages.sujet_id WHERE `;
  sql += !query.sujet_id
    ? `messages.id = ${query.id}`
    : `messages.sujet_id = ${query.sujet_id};`;

  const [messages] = await connection.execute(sql);
  if (messages.length === 0) return { status: 200, body: [] };

  return { status: 200, body: messages };
});
