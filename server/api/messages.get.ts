import { getConnection } from '~/server/sql/dbConnection'
import url from 'url'

export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const parsedUrl = url.parse(event._path, true)
    const query = parsedUrl.query
    const sql = !query.sujet_id ? `SELECT * FROM messages` : `SELECT messages.id, messages.contenu, messages.date_crea, users.id as user_id, users.login FROM messages 
        JOIN users ON messages.author_id = users.id WHERE sujet_id = ${query.sujet_id};`;

    
    const [messages] = await connection.execute(sql)
    if(messages.length === 0) return {status: 200, body: []}   

    return {status: 200, body: messages}
})