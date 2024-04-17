import { getConnection } from '~/server/sql/dbConnection'
import url from 'url'

export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const parsedUrl = url.parse(event._path, true)
    const query = parsedUrl.query
    const urlSubject = `SELECT sujets.id, sujets.titre, sujets.date_crea, MAX(messages.date_crea) AS date_dernier_message, 
                            (SELECT users.login FROM messages JOIN users ON messages.author_id = users.id WHERE messages.sujet_id = sujets.id 
                            ORDER BY messages.date_crea DESC LIMIT 1) AS auteur_dernier_message FROM sujets JOIN messages ON sujets.id = messages.sujet_id 
                            WHERE sujets.forum_id = ${query.forum_id} GROUP BY sujets.titre ORDER BY date_dernier_message DESC;`;
    const sql = !query.forum_id ? `SELECT * FROM sujets` : urlSubject;

    const [sujets] = await connection.execute(sql)

    return {status: 200, body: sujets}
})