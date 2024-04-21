import { getConnection } from '~/server/sql/dbConnection'
import url from 'url'

export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const parsedUrl = url.parse(event._path, true)
    const query = parsedUrl.query
    const sql = `DELETE FROM forums WHERE id = ${query.id};`;
    const [request] = await connection.execute(sql)
    if(request.affectedRows === 0) return {status: 400, body: "Forum introuvable"}

    return {status: 200, body: 'Le forum a bien été supprimé'}
})