import { getConnection } from '~/server/sql/dbConnection'
import url from 'url'
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const parsedUrl = url.parse(event._path, true)
    const query = parsedUrl.query

    if(!query || query.login?.length === 0 || query.password?.length === 0) return {status: 400, body: "login and password are require"}

    const [user] = await connection.execute(`SELECT * FROM users WHERE login = '${query.login}'`)
    if(user.length === 0) return {status: 400, body: "user not found"}
    
    const salt = 'itisasecretsalt'
    const hash = crypto.createHmac('sha512', salt)
    const hashedPassword = hash.update(query.password).digest('hex')
    if(user[0].password !== hashedPassword) return {status: 400, body: "wrong password"}

    event.context.session.user = {}
    event.context.session.user = user[0].login
    return {status: 200, body: "user connected"}
})