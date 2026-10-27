const {Motorista, Carga, Entrega, Funcionario} = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase() {
    try{
        await conn.sync({force: true})
        console.log('rodando')
    }catch(err){
        console.error('erro',err)
    }finally{
        await conn.close()
        console.log('fechando')
    }
}

syncDataBase()