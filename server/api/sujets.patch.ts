import { defineWrappedResponseHandler } from "../utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const connection = event.context.mysql;

  const body = await readBody(event);
  if (!body || !body.id)
    return {
      status: 400,
      body: "Un ID est nécessaire pour modifier un forum",
    };

  const [sujet] = await connection.execute(
    `SELECT * FROM sujets WHERE id = '${body.id}'`
  );
  if (sujet.length === 0) return { status: 400, body: "Le sujet n'existe pas" };

  const [update] = await connection.execute(
    `UPDATE sujets SET isClosed = '${body.close ? 0 : 1}' WHERE id = ${body.id}`
  );
  if (update.affectedRows === 0)
    return {
      status: 500,
      body: "Une erreur est survenue lors de la modification du sujet",
    };
  return { status: 200, body: "Sujet modifié avec succès" };
});
