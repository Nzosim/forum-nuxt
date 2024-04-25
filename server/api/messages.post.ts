import { defineWrappedResponseHandler } from "../utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const connection = event.context.mysql;

  const body = await readBody(event);
  if (!body || !body.contenu || !body.sujet_id || !body.author_id)
    return {
      status: 400,
      body: "Il manque des informations pour créer un message",
    };

  const date = new Date().toISOString();
  const sql = !body.citation_id
    ? `INSERT INTO messages (contenu, date_crea, sujet_id, author_id) VALUES ('${body.contenu}', '${date}', ${body.sujet_id}, ${body.author_id})`
    : `
    INSERT INTO messages (contenu, date_crea, sujet_id, author_id, citation_id) VALUES ('${body.contenu}', '${date}', ${body.sujet_id}, ${body.author_id}, ${body.citation_id})`;
  await connection.execute(sql).catch((error: any) => {
    return { status: 500, body: error };
  });

  return { status: 200, body: "Message créé avec succès" };
});
