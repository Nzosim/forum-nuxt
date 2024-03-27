import { getConnection } from '~/server/sql/dbConnection'

export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const body = await readBody(event)
    if(!body || !body.contenu || !body.sujet_id || !body.author_id) return {status: 400, body: "missing parameters"}

    let error = null;
    const date = new Date().toISOString()
    await connection.execute(`INSERT INTO messages (contenu, date_crea, sujet_id, author_id) VALUES ('${body.contenu}', '${date}', ${body.sujet_id}, ${body.author_id})`)
        .catch (err => {
            console.log(err)
            error = err;
        })

    if(error) return {status: 500, body: error}
    return {status: 200, body: "messages created"}
})