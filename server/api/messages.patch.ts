import { getConnection } from '~/server/sql/dbConnection'

// TODO : pour le moment fonctionne avec un id, modifier pour fonctionner avec la session et empêcher de modifier un message qui n'appartient pas à 
// l'utilisateur sauf pour les admins
export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const body = await readBody(event)

    if(!body || !body.id || !body.contenu) return {status: 400, body: "id or contenu is missing"}

    const [message] = await connection.execute(`SELECT * FROM messages WHERE id = '${body.id}'`)
    if(message.length === 0) return {status: 400, body: "message not found"}

    const [update] = await connection.execute(`UPDATE messages SET contenu = '${body.contenu}' WHERE id = '${body.id}'`)
    if(update.affectedRows === 0) return {status: 500, body: "error while updating message"}

    return {status: 200, body: "message updated"}
})