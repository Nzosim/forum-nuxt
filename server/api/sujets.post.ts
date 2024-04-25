import { defineWrappedResponseHandler } from "../utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const connection = event.context.mysql;

  const body = await readBody(event);
  if (!body || !body.titre || !body.forum_id || !body.author_id)
    return {
      status: 400,
      body: "Il manque des informations pour créer un sujet",
    };

  // Vérification de l'existence du sujet
  const [sujets] = await connection.execute(
    `SELECT * FROM sujets WHERE titre = '${body.titre}' AND forum_id = ${body.forum_id} AND author_id = ${body.author_id}`
  );
  if (sujets.length > 0) return { status: 400, body: "Le sujet existe déjà" };

  // Création du sujet
  const date = new Date().toISOString();
  const [new_subject] = await connection
    .execute(
      `INSERT INTO sujets (titre, date_crea, isClosed, forum_id, author_id) VALUES ('${body.titre}', '${date}', 0, ${body.forum_id}, ${body.author_id})`
    )
    .catch((err) => {
      return { status: 500, body: err };
    });

  return {
    status: 200,
    body: "Sujet créé avec succès",
    subject_id: new_subject.insertId,
  };
});
