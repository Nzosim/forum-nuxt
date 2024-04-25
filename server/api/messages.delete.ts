import url from "url";
import { defineWrappedResponseHandler } from "../utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const connection = event.context.mysql;

  const parsedUrl = url.parse(event._path, true);
  const query = parsedUrl.query;
  const sql = `DELETE FROM messages WHERE id = ${query.id};`;
  const [request] = await connection.execute(sql);
  if (request.affectedRows === 0)
    return { status: 400, body: "Message introuvable" };

  return { status: 200, body: "Le message a bien été supprimé" };
});
