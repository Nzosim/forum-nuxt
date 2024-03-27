import { getConnection } from '~/server/sql/dbConnection'

export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const body = await readBody(event)
    if(!body || !body.titre || !body.forum_id || !body.author_id) return {status: 400, body: "missing parameters"}

    const [sujets] = await connection.execute(`SELECT * FROM sujets WHERE titre = '${body.titre}'`)
    if(sujets.length > 0) return {status: 400, body: "sujets already exists"}

    let error = null;
    const date = new Date().toISOString()
    await connection.execute(`INSERT INTO sujets (titre, date_crea, forum_id, author_id) VALUES ('${body.titre}', '${date}', ${body.forum_id}, ${body.author_id})`)
        .catch (err => {
            console.log(err)
            error = err;
        })

    if(error) return {status: 500, body: error}
    return {status: 200, body: "sujets created"}
})