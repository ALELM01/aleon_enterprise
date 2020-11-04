/*import MongoClient from 'mongodb'


export async function connect() {
    try {
        const client = await MongoClient.connect('mongodb+srv://user:user@mvico-hbci6.azure.mongodb.net/test?retryWrites=true&w=majority', {
            useUnifiedTopology: true
        })
        const db = client.db('Proyecto')
        console.log('DB is connected')
        return db
    } catch(e) {
        console.log(e)
    }
}*/
const mongoose = require('mongoose')

import MongoClient from 'mongodb'


export async function connect() {
    try {
        const client = await MongoClient.connect('mongodb+srv://admin:Alex_1007@cluster0-yzhtx.mongodb.net/alm_enterprise?retryWrites=true&w=majority', {
            useUnifiedTopology: true
        })
        const db = client.db('alm_enterprise')
        console.log('DB is connected')
        return db
    } catch(e) {
        console.log(e)
    }
}
//conectar a la base de datos
const atlasURL = 
'mongodb+srv://admin:Alex_1007@cluster0-yzhtx.mongodb.net/alejandroleonmunozpro?retryWrites=true&w=majority'
mongoose.connect(atlasURL, {userNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log('Conectado a la DB'))
    .catch(error => console.log(error))