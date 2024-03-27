import { getConnection } from '~/server/sql/dbConnection'
import crypto from 'crypto'


export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const body = await readBody(event)
    if(!body || !body.login || !body.password) return {status: 400, body: "login and password are require"}

    // vérifier si l'utilisateur existe déjà
    const [login] = await connection.execute(`SELECT * FROM users WHERE login = '${body.login}'`)
    if(login.length > 0) return {status: 400, body: "login already exists"}

    const salt = 'itisasecretsalt'
    const hash = crypto.createHmac('sha512', salt)
    const hashedPassword = hash.update(body.password).digest('hex')

    let error = null;
    await connection.execute(`INSERT INTO users (login, password, role) VALUES ('${body.login}', '${hashedPassword}', 2)`)
        .catch (err => {
            console.log(err)
            error = err;
        })

    if(error) return {status: 500, body: error}
    return {status: 200, body: "user created"}
})