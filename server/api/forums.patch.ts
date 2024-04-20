import { getConnection } from '~/server/sql/dbConnection'

// TODO : vérifier que l'utilisateur est un admin pour modifier un forum
export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const body = await readBody(event)
    if(!body || !body.id || !body.name) return {status: 400, body: "Un ID et un nom sont requis pour modifier un forum"}

    const [forum] = await connection.execute(`SELECT * FROM forums WHERE id = '${body.id}'`)
    if(forum.length === 0) return {status: 400, body: "Le forum n'existe pas"}

    let error = null;
    const [update] = await connection.execute(`UPDATE forums SET nom = '${body.name}' WHERE id = ${body.id}`)
    if(update.affectedRows === 0) return {status: 500, body: "Une erreur est survenue lors de la modification du forum"}
    return {status: 200, body: "Forum modifié avec succès"}
})