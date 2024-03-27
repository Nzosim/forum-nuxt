import mysql from 'mysql2/promise'
import bluebird from 'bluebird'

export async function getConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'projet',
        password: 'projet',
        database: 'projet',
        Promise: bluebird,
    })

    return connection
}