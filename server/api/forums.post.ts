import { getConnection } from '~/server/sql/dbConnection'

export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const body = await readBody(event)
    if(!body || !body.name) return {status: 400, body: "Un nom est requis pour créer un forum"}

    const [forum] = await connection.execute(`SELECT * FROM forums WHERE nom = '${body.name}'`)
    if(forum.length > 0) return {status: 400, body: "Le forum existe déjà"}

    let error = null;
    await connection.execute(`INSERT INTO forums (nom) VALUES ('${body.name}')`)
        .catch (err => {
            console.log(err)
            error = err;
        })

    if(error) return {status: 500, body: error}
    return {status: 200, body: "Forum créé avec succès"}
})