import url from "url";
import { defineWrappedResponseHandler } from "../utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const connection = event.context.mysql;

  const parsedUrl = url.parse(event._path, true);
  const query = parsedUrl.query;
  // Suppression du forum
  const sql = `DELETE FROM forums WHERE id = ${query.id};`;
  const [request] = await connection.execute(sql);
  if (request.affectedRows === 0)
    return { status: 400, body: "Forum introuvable" };

  // Récupération des sujets du forum
  const [request_sujets] = await connection.execute(
    `SELECT id FROM sujets WHERE forum_id = ${query.id};`
  );

  // Suppression des sujets et de leurs messages
  for(const sujet of request_sujets) {
    await connection.execute(`DELETE FROM messages WHERE sujet_id = ${sujet.id};`);
    await connection.execute(`DELETE FROM sujets WHERE id = ${sujet.id};`);
  }

  return { status: 200, body: "Le forum a bien été supprimé" };
});
