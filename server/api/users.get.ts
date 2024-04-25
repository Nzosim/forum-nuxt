import url from "url";
import crypto from "crypto";
import { defineWrappedResponseHandler } from "../utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const connection = event.context.mysql;

  const parsedUrl = url.parse(event._path, true);
  const query = parsedUrl.query;

  if (!query || query.login?.length === 0 || query.password?.length === 0)
    return {
      status: 400,
      body: "Un login et un mot de passe sont requis pour se connecter",
    };

  // Vérification si l'utilisateur est déjà connecté
  if (event.context.session.user)
    return { status: 400, body: "Vous êtes déjà connecté" };

  // Vérification de l'existence de l'utilisateur
  const [user] = await connection.execute(
    `SELECT * FROM users WHERE login = '${query.login}'`
  );
  if (user.length === 0)
    return { status: 400, body: "Aucun utilisateur trouvé avec ce login" };

  // Vérification du mot de passe
  const salt = "itisasecretsalt";
  const hash = crypto.createHmac("sha512", salt);
  const hashedPassword = hash.update(query.password).digest("hex");
  if (user[0].password !== hashedPassword)
    return { status: 400, body: "Mot de passe incorrect" };

  event.context.session.user = {};
  event.context.session.user = user[0];
  return { status: 200, body: "Vous êtes connecté avec succès" };
});
