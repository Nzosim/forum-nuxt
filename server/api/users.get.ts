import { getConnection } from '~/server/sql/dbConnection'
import url from 'url'
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const parsedUrl = url.parse(event._path, true)
    const query = parsedUrl.query

    if(!query || query.login?.length === 0 || query.password?.length === 0) return {status: 400, body: "Login and password are required"}

    if(event.context.session.user) return {status: 400, body: "You are already connected"}

    const [user] = await connection.execute(`SELECT * FROM users WHERE login = '${query.login}'`)
    if(user.length === 0) return {status: 400, body: "User not found"}
    
    const salt = 'itisasecretsalt'
    const hash = crypto.createHmac('sha512', salt)
    const hashedPassword = hash.update(query.password).digest('hex')
    if(user[0].password !== hashedPassword) return {status: 400, body: "Wrong password"}

    event.context.session.user = {}
    event.context.session.user = user[0].id
    return {status: 200, body: "User connected"}
})