import { getConnection } from '~/server/sql/dbConnection'

export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const body = await readBody(event)
    if(!body || !body.titre || !body.forum_id || !body.author_id) return {status: 400, body: "missing parameters"}

    const [sujets] = await connection.execute(`SELECT * FROM sujets WHERE titre = '${body.titre}' AND forum_id = ${body.forum_id} AND author_id = ${body.author_id}`)
    if(sujets.length > 0) return {status: 400, body: "sujets already exists"}

    let error = null;
    const date = new Date().toISOString()
    const [new_subject] = await connection.execute(`INSERT INTO sujets (titre, date_crea, forum_id, author_id) VALUES ('${body.titre}', '${date}', ${body.forum_id}, ${body.author_id})`)
        .catch (err => {
            console.log(err)
            error = err;
        })

    if(error) return {status: 500, body: error}
    return {status: 200, body: "subjets created", subject_id: new_subject.insertId}
})