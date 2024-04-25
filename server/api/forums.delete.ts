import url from "url";
import { defineWrappedResponseHandler } from "../utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const connection = event.context.mysql;

  const parsedUrl = url.parse(event._path, true);
  const query = parsedUrl.query;
  const sql = `DELETE FROM forums WHERE id = ${query.id};`;
  const [request] = await connection.execute(sql);
  if (request.affectedRows === 0)
    return { status: 400, body: "Forum introuvable" };

  const [request_sujets] = await connection.execute(
    `SELECT id FROM sujets WHERE forum_id = ${query.id};`
  );
  console.log(request_sujets.body);

  return { status: 200, body: "Le forum a bien été supprimé" };
});
