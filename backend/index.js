const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const funcionarioController = require('./controller/funcionario.controller')
const authController = require('./controller/auth.controller')
const motoristaController = require('./controller/motorista.controller')
const cargaController = require('./controller/carga.controller')
const entregaController = require('./controller/entrega.controller')
const authMiddleware = require('./middleware/auth.middleware')
require('./models/rel')
const hostname = 'localhost'
const PORT = 3000
//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
//rotas públicas
app.post('/funcionario',funcionarioController.cadastrar)
app.post('/login',authController.logar)

app.get('/',(req,res)=>{
    res.status(200).json({message: 'rodando'})
})
//divisa
app.use(authMiddleware)
//rotas privadas
app.post('/motorista',motoristaController.cadastrar)
app.get('/motoristas',motoristaController.listar)
app.get('/motorista/buscarNome/:nome',motoristaController.consultarNome)
app.get('/motorista/:id',motoristaController.consultar)
app.put('/motorista/:id',motoristaController.atualizar)
app.delete('/motorista/:id',motoristaController.apagar)

app.post('/carga',cargaController.cadastrar)

app.post('/entrega',entregaController.cadastrar)
app.put('/entrega/:id',entregaController.atualizar)
app.get('/entregas',entregaController.listarOrdenado)
//server
conn.sync()

.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`servidor rodando em http://${hostname}:${PORT}`)
    })
})

.catch((err)=>{
    console.error('erro',err)
})