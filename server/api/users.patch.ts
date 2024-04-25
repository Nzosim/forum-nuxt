import crypto from "crypto";
import { defineWrappedResponseHandler } from "../utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const connection = event.context.mysql;

  const body = await readBody(event);

  if (!body || !body.login || !body.password || !body.newPassword)
    return { status: 400, body: "Un ou plusieurs champs sont manquants" };

  // Vérification de l'existence de l'utilisateur
  const [user] = await connection.execute(
    `SELECT * FROM users WHERE login = '${body.login}'`
  );
  if (user.length === 0)
    return { status: 400, body: "Aucun utilisateur trouvé avec ce login" };

  // Vérification du mot de passe
  const salt = "itisasecretsalt";
  let hash = crypto.createHmac("sha512", salt);
  const hashedPassword = hash.update(body.password).digest("hex");
  if (user[0].password !== hashedPassword)
    return { status: 400, body: "Mot de passe incorrect" };

  // Modification du mot de passe
  hash = crypto.createHmac("sha512", salt);
  const newHashedPassword = hash.update(body.newPassword).digest("hex");
  const [update] = await connection.execute(
    `UPDATE users SET password = '${newHashedPassword}' WHERE login = '${body.login}'`
  );
  if (update.affectedRows === 0)
    return {
      status: 500,
      body: "Une erreur est survenue lors de la modification du mot de passe",
    };

  return { status: 200, body: "Votre mot de passe a été modifié avec succès" };
});
