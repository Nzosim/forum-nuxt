import { defineWrappedResponseHandler } from "../utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const connection = event.context.mysql;

  const [forums] =
    await connection.execute(`SELECT forums.id, forums.nom, COUNT(sujets.id) AS nombre_de_sujets
        FROM forums LEFT JOIN sujets ON forums.id = sujets.forum_id GROUP BY forums.id, forums.nom;`);
  if (forums.length === 0) return { status: 200, body: [] };

  return { status: 200, body: forums };
});
