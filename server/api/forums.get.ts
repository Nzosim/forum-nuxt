import { getConnection } from '~/server/sql/dbConnection'

export default defineEventHandler(async (event) => {
    const connection = await getConnection()

    const [forums] = await connection.execute(`SELECT * FROM forums`)
    if(forums.length === 0) return {status: 200, body: []}   

    return {status: 200, body: forums}
})