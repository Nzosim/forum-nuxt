import crypto from "crypto";
import { defineWrappedResponseHandler } from "../utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const connection = event.context.mysql;

  const body = await readBody(event);
  if (!body || !body.login || !body.password)
    return {
      status: 400,
      body: "Un login et un mot de passe sont requis pour créer un utilisateur",
    };

  // vérifier si l'utilisateur existe déjà
  const [login] = await connection.execute(
    `SELECT * FROM users WHERE login = '${body.login}'`
  );
  if (login.length > 0)
    return { status: 400, body: "L'utilisateur existe déjà" };

  // Création de l'utilisateur
  const salt = "itisasecretsalt";
  const hash = crypto.createHmac("sha512", salt);
  const hashedPassword = hash.update(body.password).digest("hex");

  const adminRole = body.isAdmin ? 1 : 2;
  const querySQL = `INSERT INTO users (login, password, role) VALUES ('${body.login}', '${hashedPassword}', ${adminRole})`;
  await connection.execute(querySQL);
  return { status: 200, body: "Utilisateur créé avec succès" };
});
