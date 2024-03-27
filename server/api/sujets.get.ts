import { getConnection } from '~/server/sql/dbConnection'
import url from 'url'

export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const parsedUrl = url.parse(event._path, true)
    const query = parsedUrl.query
    const sql = !query.forum_id ? `SELECT * FROM sujets` : `SELECT * FROM sujets WHERE forum_id = ${query.forum_id}`;

    const [sujets] = await connection.execute(sql)

    return {status: 200, body: sujets}
})