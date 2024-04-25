import { defineWrappedResponseHandler } from "../utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const connection = event.context.mysql;

  const body = await readBody(event);

  if (!body || !body.id || !body.contenu)
    return {
      status: 400,
      body: "Un ID et un contenu sont requis pour modifier un message",
    };

  const [message] = await connection.execute(
    `SELECT * FROM messages WHERE id = '${body.id}'`
  );
  if (message.length === 0)
    return { status: 400, body: "Le message n'existe pas" };

  const date = new Date().toISOString();
  console.log(date);
  const [update] = await connection.execute(
    `UPDATE messages SET contenu = '${body.contenu}', date_modif = '${date}' WHERE id = '${body.id}'`
  );
  if (update.affectedRows === 0)
    return { status: 500, body: "Erreur lors de la modification du message" };

  return { status: 200, body: "Message modifié avec succès" };
});
