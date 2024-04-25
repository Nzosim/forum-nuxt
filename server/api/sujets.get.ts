import url from "url";
import { defineWrappedResponseHandler } from "../utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const connection = event.context.mysql;
  const parsedUrl = url.parse(event._path, true);
  const query = parsedUrl.query;
  // Récupération des sujets d'un forum, avec la date du dernier message et son auteur
  const urlSubject = `SELECT s.id, s.titre, s.date_crea, m.date_crea AS date_dernier_message, u.login AS auteur_dernier_message
    FROM sujets s
    LEFT JOIN (
        SELECT m1.*
        FROM messages m1
        INNER JOIN (
            SELECT MAX(date_crea) AS max_date, sujet_id
            FROM messages
            GROUP BY sujet_id
        ) m2 ON m1.date_crea = m2.max_date AND m1.sujet_id = m2.sujet_id
    ) m ON s.id = m.sujet_id
    LEFT JOIN users u ON m.author_id = u.id
    WHERE s.forum_id = ${query.forum_id}
    ORDER BY m.date_crea DESC;
    `;

  const [sujets] = await connection.execute(urlSubject);

  return { status: 200, body: sujets };
});
