import { getConnection } from '~/server/sql/dbConnection'
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const body = await readBody(event)
    if(!body || !body.login || !body.password) return {status: 400, body: "Un login et un mot de passe sont requis pour créer un utilisateur"}

    // vérifier si l'utilisateur existe déjà
    const [login] = await connection.execute(`SELECT * FROM users WHERE login = '${body.login}'`)
    if(login.length > 0) return {status: 400, body: "L'utilisateur existe déjà"}

    const salt = 'itisasecretsalt'
    const hash = crypto.createHmac('sha512', salt)
    const hashedPassword = hash.update(body.password).digest('hex')

    const querySQL = !body.admin ? `INSERT INTO users (login, password, role) VALUES ('${body.login}', '${hashedPassword}', 2)` : `INSERT INTO users (login, password, role) VALUES ('${body.login}', '${hashedPassword}', 1)`
    await connection.execute(querySQL)
    return {status: 200, body: "Utilisateur créé avec succès"}
})