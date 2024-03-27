import { getConnection } from '~/server/sql/dbConnection'

export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const body = await readBody(event)
    if(!body || !body.name) return {status: 400, body: "name are require"}

    const [forum] = await connection.execute(`SELECT * FROM forums WHERE nom = '${body.name}'`)
    if(forum.length > 0) return {status: 400, body: "forum already exists"}

    let error = null;
    await connection.execute(`INSERT INTO forums (nom) VALUES ('${body.name}')`)
        .catch (err => {
            console.log(err)
            error = err;
        })

    if(error) return {status: 500, body: error}
    return {status: 200, body: "forum created"}
})