import { getConnection } from '~/server/sql/dbConnection'
import url from 'url'

export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const parsedUrl = url.parse(event._path, true)
    const query = parsedUrl.query
    const sql = `DELETE FROM messages WHERE id = ${query.id};`;
    const [request] = await connection.execute(sql)
    if(request.affectedRows === 0) return {status: 400, body: "message not found"}

    return {status: 200, body: 'message supprimé'}
})