import { defineWrappedResponseHandler } from "../utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const connection = event.context.mysql;

  const body = await readBody(event);
  if (!body || !body.name)
    return { status: 400, body: "Un nom est requis pour créer un forum" };

  // Vérification de l'existence du forum
  const [forum] = await connection.execute(
    `SELECT * FROM forums WHERE nom = '${body.name}'`
  );
  if (forum.length > 0) return { status: 400, body: "Le forum existe déjà" };

  // Création du forum
  await connection
    .execute(`INSERT INTO forums (nom) VALUES ('${body.name}')`)
    .catch((err: any) => {
      return { status: 500, body: err };
    });

  return { status: 200, body: "Forum créé avec succès" };
});
